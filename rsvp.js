document.addEventListener(
  "DOMContentLoaded",
  function () {

    const form =
      document.getElementById("rsvpForm");

    const result =
      document.getElementById("rsvpResult");

    const submitButton =
      document.querySelector(".submit-rsvp");


    /*
     * 여기에 Google Apps Script
     * Web App URL을 넣으세요.
     */
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbxOAEG8e_RJ9pBZzBoLFGXCVerv8zOzmT-6JSzWz7IKjWwDLVYMNh9NQXrZ78Y3n4I3MA/exec";


    if (!form) {
      return;
    }


    form.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        const formData =
          new FormData(form);


        const data = {

          attendance:
            formData.get("attendance"),

          guestName:
            formData.get("guestName"),

          phone:
            formData.get("phone"),

          guestCount:
            formData.get("guestCount"),

          message:
            formData.get("message")

        };


        /*
         * 버튼 중복 클릭 방지
         */

        if (submitButton) {

          submitButton.disabled = true;

          submitButton.textContent =
            "Submitting...";

        }


        if (result) {

          result.style.display =
            "none";

        }


        try {

          await fetch(
            GOOGLE_SCRIPT_URL,
            {
              method: "POST",

              /*
               * Apps Script와 브라우저 간
               * CORS 문제를 피하기 위해
               * text/plain으로 전송합니다.
               */
              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body:
                JSON.stringify(data)
            }
          );


          if (result) {

            if (
              data.attendance ===
              "attending"
            ) {

              result.textContent =
                data.guestName +
                "님, RSVP가 제출되었습니다. 함께해 주셔서 감사합니다 ♡";

            } else {

              result.textContent =
                data.guestName +
                "님, 답변해 주셔서 감사합니다.";

            }


            result.style.display =
              "block";

          }


          form.reset();


        } catch (error) {

          console.error(
            "RSVP submission error:",
            error
          );


          if (result) {

            result.textContent =
              "제출 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";

            result.style.display =
              "block";

          }

        } finally {

          if (submitButton) {

            submitButton.disabled =
              false;

            submitButton.textContent =
              "Submit RSVP";

          }

        }

      }
    );

  }
);