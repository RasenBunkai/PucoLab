
import {supabase} from "../lib/supabase";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      };
      await handleSubmit(formData);
      form.reset();
    });
  }
});

export async function handleSubmit(formData) {
  const {name, email, subject, message} = formData;

  const { error } = await supabase
    .from("contact_messages")
    .insert([{name, email, subject, message}]);

  if (error) {
    alert("❌ Error al enviar mensaje: " + error.message);
    console.error(error);
  } else {
    alert("✅ ¡Mensaje enviado correctamente!");
  }
}
