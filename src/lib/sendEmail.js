import emailjs from "@emailjs/browser";

export const sendResultEmail = async (student) => {
  const brochureUrl = "/brochure.pdf";

  const response = await fetch(brochureUrl);
  const blob = await response.blob();

  const reader = new FileReader();
  reader.readAsDataURL(blob);

  reader.onloadend = async () => {
    const base64File = reader.result.split(",")[1];

    await emailjs.send(
      "service_j8b5xai",
      "template_5i20hxp",
      {
        student_name: student.name,
        score: student.score,
        rank: student.rank,

        to_email: student.email,
      },
      "brb9ovJREI08B_ypW"
    );
  };
};
