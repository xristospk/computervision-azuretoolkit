 using System.Collections.Generic;

 namespace AzureToolkit.Models {
     public class SavedImage {
         public int SavedImageId { get; set; }
         public string UserId { get; set; }
         public string Description { get; set; }
         public List<SavedImageTag> Tags { get; set; }
         public List<SavedFace> Faces { get; set; }
         public string StorageUrl { get; set; }
     }

     public class SavedFace {
         public int SavedFaceId { get; set; }
         public int Age { get; set; }
         public string Gender { get; set; }
         public SavedFaceRectangle FaceRectangle { get; set; }
     }

     public class SavedFaceRectangle {
         public int SavedFaceRectangleId { get; set; }
         public int Top { get; set; }
         public int Left { get; set; }
         public int Width { get; set; }
         public int Height { get; set; }
     }

     public class SavedImageTag {
         public int SavedImageTagId { get; set; }
         public int SavedImageId { get; set; }
         public string Tag { get; set; }
     }
 }