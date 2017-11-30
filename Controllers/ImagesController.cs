 using System.Net;
 using System.Threading.Tasks;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.WindowsAzure.Storage.Blob;
 using Microsoft.WindowsAzure.Storage;
using System.Collections.Generic;
using System.Linq;
using System;

namespace AzureToolkit.Controllers {

     [Route("api/[controller]")]
     public class ImagesController : Controller {
         private CloudBlobContainer _container;

         public ImagesController() {
             var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("azuretkstoragepk", "EtOISefALqnWedlP9edo39oKUSaLkuQrS7YvlWmkYV64ZFrRkcB2q6vPa5Kqmbr2T8Por6VYbk1WPYgy1eHRkQ==");
             var storageAccount = new CloudStorageAccount(credentials, true);

             var blobClient = storageAccount.CreateCloudBlobClient();
             _container = blobClient.GetContainerReference("savedImages");
         }

         [HttpPost]
         public async Task<IActionResult> PostImage([FromBody] ImagePostRequest request) {
             var blockBlob = _container.GetBlockBlobReference($"{request.Id}{request.EncodingFormat}");
             var aRequest = (HttpWebRequest) WebRequest.Create(request.URL);
             var aResponse = (await aRequest.GetResponseAsync()) as HttpWebResponse;

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