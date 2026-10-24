document.addEventListener(
    "DOMContentLoaded",
    function () {

/* ========================================
   GALLERY PHOTO MODAL + SWIPE
======================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const modal =
    document.getElementById("photoModal");

const modalImage =
    document.getElementById("modalImage");

const closeButton =
    document.querySelector(".close-button");

const prevButton =
    document.querySelector(".photo-prev");

const nextButton =
    document.querySelector(".photo-next");

const photoCounter =
    document.querySelector(".photo-counter");

let currentPhotoIndex = 0;

const galleryPhotos = Array.from(galleryItems)
    .map(item => item.querySelector("img"))
    .filter(img => img !== null);


/* DISPLAY PHOTO */

function showPhoto(index) {

    if (!modalImage || galleryPhotos.length === 0) {
        return;
    }

    currentPhotoIndex =
        (index + galleryPhotos.length) %
        galleryPhotos.length;

    const photo = galleryPhotos[currentPhotoIndex];

    modalImage.src = photo.src;
    modalImage.alt = photo.alt;

    if (photoCounter) {
        photoCounter.textContent =
            `${currentPhotoIndex + 1} / ${galleryPhotos.length}`;
    }
}


/* OPEN PHOTO */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", function () {

        if (!modal || !modalImage) {
            return;
        }

        showPhoto(index);

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    });

});


/* CLOSE PHOTO */

function closePhoto() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    if (modalImage) {
        modalImage.removeAttribute("src");
    }

    document.body.style.overflow = "";
}


/* NEXT PHOTO */

function nextPhoto() {
    showPhoto(currentPhotoIndex + 1);
}


/* PREVIOUS PHOTO */

function previousPhoto() {
    showPhoto(currentPhotoIndex - 1);
}


/* ARROW BUTTONS */

if (nextButton) {
    nextButton.addEventListener("click", function (event) {
        event.stopPropagation();
        nextPhoto();
    });
}

if (prevButton) {
    prevButton.addEventListener("click", function (event) {
        event.stopPropagation();
        previousPhoto();
    });
}


/* CLOSE BUTTON */

if (closeButton) {
    closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        closePhoto();
    });
}


/* CLICK BACKGROUND */

if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closePhoto();
        }
    });
}


/* KEYBOARD */

document.addEventListener("keydown", function (event) {

    if (!modal || !modal.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closePhoto();
    }

    if (event.key === "ArrowRight") {
        nextPhoto();
    }

    if (event.key === "ArrowLeft") {
        previousPhoto();
    }
});


/* MOBILE SWIPE */

let touchStartX = 0;
let touchStartY = 0;

if (modal) {

    modal.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    modal.addEventListener("touchend", function (event) {

        const touchEndX = event.changedTouches[0].screenX;
        const touchEndY = event.changedTouches[0].screenY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > 50 &&
            Math.abs(diffX) > Math.abs(diffY)) {

            if (diffX > 0) {
                nextPhoto();
            } else {
                previousPhoto();
            }
        }

    }, { passive: true });
}


        /* ========================================
        WEDDING COUNTDOWN
        ======================================== */

        const weddingDate = Date.UTC(2027, 1, 13);

        const now = new Date();

        const today = Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const difference =
            weddingDate - today;

        const daysLeft =
            Math.round(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const weddingCountdown =
            document.getElementById(
                "weddingCountdown"
            );

        if (weddingCountdown) {

            if (daysLeft > 0) {

                weddingCountdown.innerHTML =
                    '태윤과 민영의 결혼식이 ' +
                    '<strong>' +
                    daysLeft +
                    '</strong>일 남았습니다.';

            } else if (daysLeft === 0) {

                weddingCountdown.innerHTML =
                    '오늘은 태윤과 민영의 결혼식 날입니다. ♡';

            } else {

                weddingCountdown.innerHTML =
                    '태윤과 민영의 결혼식이 있었습니다. ♡';
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