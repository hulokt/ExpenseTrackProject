function sendEmail(){
    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
    }
    const serviceId = "service_mn8krlg";
    const templateId = "template_2h5kbtd";
    emailjs.send(serviceId, templateId, params)
    .then(
        res =>{
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("message").value = "";
            console.log("Email sent successfully");
            alert("Email sent successfully!");
    })
    .catch(error => {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again later.");
    });
}