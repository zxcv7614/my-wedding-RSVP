document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* ========================================
           GALLERY PHOTO MODAL
        ======================================== */

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item"
            );

        const modal =
            document.getElementById(
                "photoModal"
            );

        const modalImage =
            document.getElementById(
                "modalImage"
            );

        const closeButton =
            document.querySelector(
                ".close-button"
            );


        /* ========================================
           OPEN PHOTO
        ======================================== */

        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        const photo =
                            item.querySelector(
                                "img"
                            );

                        if (
                            !photo ||
                            !modal ||
                            !modalImage
                        ) {
                            return;
                        }

                        modalImage.src =
                            photo.src;

                        modal.classList.add(
                            "active"
                        );

                        modal.setAttribute(
                            "aria-hidden",
                            "false"
                        );

                        document.body.style.overflow =
                            "hidden";
                    }
                );
            }
        );


        /* ========================================
           CLOSE PHOTO
        ======================================== */

        function closePhoto() {

            if (!modal) {
                return;
            }

            modal.classList.remove(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            if (modalImage) {
                modalImage.src = "";
            }

            document.body.style.overflow =
                "";
        }


        /* X BUTTON */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    closePhoto();
                }
            );
        }


        /* CLICK BACKGROUND */

        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === modal
                    ) {
                        closePhoto();
                    }
                }
            );
        }


        /* ESC KEY */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modal &&
                    modal.classList.contains(
                        "active"
                    )
                ) {
                    closePhoto();
                }
            }
        );


        /* ========================================
           WEDDING COUNTDOWN
        ======================================== */

        const weddingDate =
            new Date(
                2027,
                1,
                13
            );

        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );

        weddingDate.setHours(
            0,
            0,
            0,
            0
        );


        const difference =
            weddingDate.getTime() -
            today.getTime();


        const daysLeft =
            Math.ceil(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const weddingCountdown =
            document.getElementById(
                "weddingCountdown"
            );


        if (weddingCountdown) {

            if (daysLeft > 0) {

                weddingCountdown.innerHTML =
                    "태윤과 민영의 결혼식이 " +
                    "<strong>" +
                    daysLeft +
                    "</strong>일 남았습니다.";

            } else if (daysLeft === 0) {

                weddingCountdown.innerHTML =
                    "오늘은 태윤과 민영의 결혼식 날입니다. ♡";

            } else {

                weddingCountdown.innerHTML =
                    "태윤과 민영의 결혼식이 있었습니다. ♡";
            }
        }


        /* ========================================
           RSVP OPEN / CLOSE
        ======================================== */

        const openRsvpButton =
            document.getElementById(
                "openRsvpButton"
            );

        const rsvpFormWrapper =
            document.getElementById(
                "rsvpFormWrapper"
            );


        if (
            openRsvpButton &&
            rsvpFormWrapper
        ) {

            openRsvpButton.addEventListener(
                "click",
                function () {

                    const isOpen =
                        rsvpFormWrapper
                            .classList
                            .contains(
                                "active"
                            );


                    if (isOpen) {

                        rsvpFormWrapper
                            .classList
                            .remove(
                                "active"
                            );

                        openRsvpButton.textContent =
                            "RSVP 작성하기";

                    } else {

                        rsvpFormWrapper
                            .classList
                            .add(
                                "active"
                            );

                        openRsvpButton.textContent =
                            "RSVP 닫기";
                    }

                }
            );
        }


        /* ========================================
           RSVP FORM
        ======================================== */

        const form =
            document.getElementById(
                "rsvpForm"
            );

        const result =
            document.getElementById(
                "rsvpResult"
            );

        const submitButton =
            document.querySelector(
                ".submit-rsvp"
            );


        /* ========================================
           GOOGLE SHEETS URL
        ======================================== */

        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbxOAEG8e_RJ9pBZzBoLFGXCVerv8zOzmT-6JSzWz7IKjWwDLVYMNh9NQXrZ78Y3n4I3MA/exec";


        if (!form) {
            return;
        }


        /* ========================================
           RSVP SUBMIT
        ======================================== */

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const formData =
                    new FormData(
                        form
                    );


                const data = {

                    attendance:
                        formData.get(
                            "attendance"
                        ),

                    guestName:
                        formData.get(
                            "guestName"
                        ),

                    phone:
                        formData.get(
                            "phone"
                        ),

                    guestCount:
                        formData.get(
                            "guestCount"
                        ),

                    message:
                        formData.get(
                            "message"
                        )
                };


                /* ========================================
                   VALIDATION
                ======================================== */

                if (!data.attendance) {

                    if (result) {

                        result.textContent =
                            "참석 여부를 선택해 주세요.";

                        result.style.display =
                            "block";
                    }

                    return;
                }


                if (!data.guestName) {

                    if (result) {

                        result.textContent =
                            "성함을 입력해 주세요.";

                        result.style.display =
                            "block";
                    }

                    return;
                }


                if (!data.phone) {

                    if (result) {

                        result.textContent =
                            "연락처를 입력해 주세요.";

                        result.style.display =
                            "block";
                    }

                    return;
                }


                /* ========================================
                   SUBMIT BUTTON
                ======================================== */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Submitting...";
                }


                if (result) {

                    result.style.display =
                        "none";
                }


                /* ========================================
                   SEND TO GOOGLE SHEETS
                ======================================== */

                try {

                    await fetch(
                        GOOGLE_SCRIPT_URL,
                        {
                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify(
                                    data
                                )
                        }
                    );


                    /* ========================================
                       SUCCESS MESSAGE
                    ======================================== */

                    if (result) {

                        if (
                            data.attendance ===
                            "attending"
                        ) {

                            result.textContent =
                                data.guestName +
                                "님, RSVP가 제출되었습니다. " +
                                "함께해 주셔서 감사합니다 ♡";

                        } else {

                            result.textContent =
                                data.guestName +
                                "님, 답변해 주셔서 감사합니다.";
                        }


                        result.style.display =
                            "block";
                    }


                    /* 입력창 초기화 */

                    form.reset();


                } catch (error) {

                    console.error(
                        "RSVP submission error:",
                        error
                    );


                    /* ========================================
                       ERROR MESSAGE
                    ======================================== */

                    if (result) {

                        result.textContent =
                            "제출 중 문제가 발생했습니다. " +
                            "잠시 후 다시 시도해 주세요.";

                        result.style.display =
                            "block";
                    }


                } finally {

                    /* 제출 버튼 다시 활성화 */

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