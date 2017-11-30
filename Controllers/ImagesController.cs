using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureToolkit.Controllers {

    [Route("api/[controller]")]
    public class ImagesController : Controller {
        private CloudBlobContainer _container;

        public ImagesController() {
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
            
            return Ok();
        }
    }

    public class ImagePostRequest {
        public string URL { get; set; }
        public string Id { get; set; }
        public string EncodingFormat { get; set; }
    }

}