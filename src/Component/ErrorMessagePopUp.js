import Swal from "sweetalert2";
var errormessage = "";

export default function ErrorMessagePopUp(error) {
  if (error == "Error: Request failed with status code 415") {
    errormessage="400 Page not Found"
  } else if (error == "Error: Request failed with status code 401") {
    errormessage="401 Unauthorized user"
   
  }
   else if (error == "Error: Request failed with status code 405") {
    errormessage="405 Method Not Allowed"
    
  }
   else if (error == "Error: Request failed with status code 400") {
    errormessage="404 Page Not Found"
   
  } else if (error == "Error: Request failed with status code 204") {
    errormessage="204 No Content "
   
  } 
  else if (error == "Error: Request failed with status code 500") {
    errormessage="500 Internal Server Error"
   

  }
  else if (error == "Error: Request failed with status code 502") {
    errormessage="502 Bad Gateway"
   

  }
  else if (error == "Error: Request failed with status code 502") {
    errormessage=" 502 Bad Gateway"
  }
  else {
    errormessage="Something Went Wrong"
  }
  
  Swal.fire({
    position: "center",
    title: errormessage,
    showConfirmButton: true,
    height: "200px",
    width: "650px",
    icon: "warning",
    customClass: {
      icon: "warningicon",
      title: "titlepopup",
    }
  })


  return;
}


