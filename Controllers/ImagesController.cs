using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AzureToolkit.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureToolkit.Controllers {

    [Route("api/[controller]")]
    public class ImagesController : Controller {
        private CloudBlobContainer _container;
        private AzureToolkitContext _context;

        public ImagesController(AzureToolkitContext context) {
            this._context = context;
            var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("atkstoragepk", "Qd8l2eFnhvlP6Kta8mLvogwXbz3rg9w7D9Vlrkbnx5VN+iQ5wwPmdhk5NjO9+ihBPfJ+igg2v8BL+slv0FhDfA==");
            var storageAccount = new CloudStorageAccount(credentials, true);

            var blobClient = storageAccount.CreateCloudBlobClient();
            _container = blobClient.GetContainerReference("savedimages");
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromBody] ImagePostRequest request) {

            try {
                CloudBlockBlob blockBlob = _container.GetBlockBlobReference($"{request.Id}.{request.EncodingFormat}");
                HttpWebRequest aRequest = (HttpWebRequest) WebRequest.Create(request.URL);
                HttpWebResponse aResponse = (await aRequest.GetResponseAsync()) as HttpWebResponse;

                var stream = aResponse.GetResponseStream();
                await blockBlob.UploadFromStreamAsync(stream);
                stream.Dispose();

                var savedImage = new SavedImage() {
                    StorageUrl = blockBlob.Uri.ToString(),
                    UserId = request.UserId,
                    Description = request.Description,
                    Tags = new List<SavedImageTag>(),
                    Faces = request.Faces
                };

                request.Tags.ForEach(tag => savedImage.Tags.Add(new SavedImageTag() { Tag = tag }));

                _context.Add(savedImage);
                _context.SaveChanges();

                return Ok();
            } catch (Exception e) {
                return BadRequest(e);
            }

        }

        [HttpGet("search/{userId}/{term}")]
        public IActionResult SearchImages(string userId, string term) {
            try {

                string searchServiceName = "pk-azuretoolkit";
                string queryApiKey = "2FE3C4A63242DB7AEC2CC343B037ABB2";
                var indexClient = new SearchIndexClient(searchServiceName, "description", new SearchCredentials(queryApiKey));

                var parameters = new SearchParameters() { Filter = $"UserId eq '{userId}'" };
                DocumentSearchResult<SavedImage> result = indexClient.Documents.Search<SavedImage>(term, parameters);
                var images = result.Results.Select(savedImage => savedImage.Document);

                return Ok(images);

            } catch (Exception e) {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpGet("{userId}")]
        public IActionResult GetImages(string userId) {
            try {
                var images = _context.SavedImages.Where(image => image.UserId == userId);
                return Ok(images);
            } catch (Exception e) {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }

    public class ImagePostRequest {
        public string UserId { get; set; }
        public string Description { get; set; }
        public List<string> Tags { get; set; }
        public List<SavedFace> Faces { get; set; }
        public string URL { get; set; }
        public string Id { get; set; }
        public string EncodingFormat { get; set; }
    }

}