document.addEventListener('DOMContentLoaded', function () {
    const dropDonor = document.querySelector('.drop-donor');
    const hideDonor = document.querySelector('.hide-donor');
    const receiverDrop = document.querySelector('.receiver-drop');
    const receiversHide = document.querySelector('.receivers-hide');

    // Set the initial height to zero
    hideDonor.style.height = '0';
    receiversHide.style.height = '0';

    // Add a transition effect for smooth sliding
    hideDonor.style.transition = 'height 0.3s ease-in-out';
    receiversHide.style.transition = 'height 0.3s ease-in-out';

    dropDonor.addEventListener('click', function () {
        if (hideDonor.style.height === '0px') {
            hideDonor.style.height = hideDonor.scrollHeight + 'px'; // Expand smoothly
            receiversHide.style.height = '0'; // Close the other div
        } else {
            hideDonor.style.height = '0'; // Collapse smoothly
        }
    });

    receiverDrop.addEventListener('click', function () {
        if (receiversHide.style.height === '0px') {
            receiversHide.style.height = receiversHide.scrollHeight + 'px'; // Expand smoothly
            hideDonor.style.height = '0'; // Close the other div
        } else {
            receiversHide.style.height = '0'; // Collapse smoothly
        }
    });
});
