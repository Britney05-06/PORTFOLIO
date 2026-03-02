emailjs.init("AJw-oqjCRj00BXGMH")
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            reply_to: document.getElementById("email").value // ici pour pouvoir répondre
        };

        emailjs.send("service_y8i8y4l", "template_5th8hsu", templateParams)
            .then(function() {
                window.location.href = "index.html";
                document.getElementById("contact-form").reset();
            }, function() {
                alert("Oups, une erreur est survenue. Essaie à nouveau.");
            });
    });
});