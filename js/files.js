var loadFileBefore = function (event) {
  let imageBefore = document.getElementById("before");
  imageBefore.src = URL.createObjectURL(event.target.files[0]);
};
var loadFileAfter = function (event) {
  let imageAfter = document.getElementById("after");
  imageAfter.src = URL.createObjectURL(event.target.files[0]);
  initComparisons();
};

function reset() {
  let imageBefore = document.getElementById("before");
  let imageAfter = document.getElementById("after");
  imageBefore.src = "";
  imageAfter.src = "";
  location.reload();
}


window.onload = function() {
	let contentTargetBefore = document.getElementById("pasteContainerBefore");   
	
	contentTargetBefore.onpaste = (e) => {                                                  // When there's an paste event on our target DIV:
	   let cbPayload = [...(e.clipboardData || e.originalEvent.clipboardData).items];     // Capture the ClipboardEvent's eventData payload as an array
		   cbPayload = cbPayload.filter(i => /image/.test(i.type));                       // Strip out the non-image bits
	   
	   if(!cbPayload.length || cbPayload.length === 0) return false;                      // If no image was present in the collection, bail.
	   
	   let imageBefore = document.getElementById("before");
	   imageBefore.src = URL.createObjectURL(cbPayload[0].getAsFile());                    // ... then read in the pasteboard image data as Base64

	   //    let reader = new FileReader();                                                     // Instantiate a FileReader...
	   //    reader.onload = (e) => contentTargetBefore.innerHTML = `<img src="${e.target.result}">`; // ... set its onLoad to render the event target's payload
	   //    reader.readAsDataURL(cbPayload[0].getAsFile());   
	};
	

	let contentTargetAfter = document.getElementById("pasteContainerAfter");               // Target our DIV's DOM node.
	
	contentTargetAfter.onpaste = (e) => {                                                      // When there's an paste event on our target DIV:
	   let cbPayload = [...(e.clipboardData || e.originalEvent.clipboardData).items];    	 // Capture the ClipboardEvent's eventData payload as an array
		   cbPayload = cbPayload.filter(i => /image/.test(i.type));                      	 // Strip out the non-image bits
	   
	   if(!cbPayload.length || cbPayload.length === 0) return false;						// If no image was present in the collection, bail.
	   
	   let imageAfter = document.getElementById("after");
	   imageAfter.src = URL.createObjectURL(cbPayload[0].getAsFile());  

	//    let reader = new FileReader();                                                     // Instantiate a FileReader...
	//    reader.onload = (e) => contentTargetAfter.innerHTML = `<img src="${e.target.result}">`; // ... set its onLoad to render the event target's payload
	//    reader.readAsDataURL(cbPayload[0].getAsFile());                                    // ... then read in the pasteboard image data as Base64
	};
}




//another idea from  https://www.techiedelight.com/paste-image-from-clipboard-using-javascript/
// document.onpaste = function (pasteEvent) {
//   // consider the first item (can be easily extended for multiple items)
//   var item = pasteEvent.clipboardData.items[0];

//   if (item.type.indexOf("image") === 0) {
//     var blob = item.getAsFile();

//     var reader = new FileReader();
//     reader.onload = function (event) {
//       document.getElementById("container").src = event.target.result;
// 	  let imageBefore = document.getElementById("before");
// 	  imageBefore.src = URL.createObjectURL(blob);
//     };

//     reader.readAsDataURL(blob);
//   }
// };

