using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AzureToolkit.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureToolkit.Controllers {

    [Route("api/[controller]")]
    public class ImagesController : Controller {
        private CloudBlobContainer _container;
        private AzureToolkitContext _context;

        public ImagesController(AzureToolkitContext context) {
            this._context = context;
            var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("azuretkstoragepk", "EtOISefALqnWedlP9edo39oKUSaLkuQrS7YvlWmkYV64ZFrRkcB2q6vPa5Kqmbr2T8Por6VYbk1WPYgy1eHRkQ==");
            var storageAccount = new CloudStorageAccount(credentials, true);

            var blobClient = storageAccount.CreateCloudBlobClient();
            _container = blobClient.GetContainerReference("savedimages");
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromBody] ImagePostRequest request) {
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
                Tags = new List<SavedImageTag>()
            };

            request.Tags.ForEach(tag => savedImage.Tags.Add(new SavedImageTag() { Tag = tag }));
            
            _context.Add(savedImage);
            _context.SaveChanges();
            
            return Ok();
        }
    }

    public class ImagePostRequest {
        public string UserId { get; set; }
        public string Description { get; set; }
        public List<string> Tags { get; set; }
        public string URL { get; set; }
        public string Id { get; set; }
        public string EncodingFormat { get; set; }
    }

}