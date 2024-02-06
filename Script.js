function toggleTheme() {
    let theme = document.getElementById('theme');
    let checkbox = document.getElementById('checkboxInput');

    console.log("Checkbox state:", checkbox.checked);

    if (checkbox.checked) {
        console.log("Dark mode activated");
        theme.setAttribute('href', 'DarkMode.css');
    } else {
        console.log("Light mode activated");
        theme.setAttribute('href', 'LightMode.css');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadComments("comment-list1", "comments1", "comment-form1");

    let form1 = document.querySelector(".comment-form1");
    form1.addEventListener("submit", function (event) {
        event.preventDefault();
        let commentInput = form1.querySelector("textarea[name='comment']");
        let commentText = commentInput.value.trim();

        if (commentText === "") {
            return;
        }

        saveComment(commentText, "comments1");
        form1.reset();
        loadComments("comment-list1", "comments1", "comment-form1");
    });
    loadComments("comment-list2", "comments2", "comment-form2");

    let form2 = document.querySelector(".comment-form2");
    form2.addEventListener("submit", function (event) {
        event.preventDefault();
        let commentInput = form2.querySelector("textarea[name='comment']");
        let commentText = commentInput.value.trim();

        if (commentText === "") {
            return;
        }

        saveComment(commentText, "comments2");
        form2.reset();
        loadComments("comment-list2", "comments2", "comment-form2");
    });
});

function saveComment(commentText, storageKey) {
    let comments = JSON.parse(localStorage.getItem(storageKey)) || [];
    comments.push(commentText);
    localStorage.setItem(storageKey, JSON.stringify(comments));
}

function loadComments(commentListClass, storageKey, formClass) {
    let comments = JSON.parse(localStorage.getItem(storageKey)) || [];
    let commentList = document.querySelector("." + commentListClass);

    commentList.innerHTML = "";
    comments.forEach(function (commentText) {
        let listItem = document.createElement("li");
        listItem.textContent = commentText;
        commentList.appendChild(listItem);
    });
}

let hasPostLiked1 = false;
let hasPostLiked2 = false;

document.addEventListener("DOMContentLoaded", function () {
    const likeButtons = document.querySelectorAll('.likeButton');

    likeButtons.forEach(button => {
        const buttonId = button.getAttribute('data-id');
        const likeCount = document.getElementById(`likeCount${buttonId}`);

        let count = parseInt(localStorage.getItem(`likeCount${buttonId}`)) || 0;
        likeCount.textContent = count;

        button.addEventListener('click', function () {
            if ((hasPostLiked1 && buttonId == 1) || (hasPostLiked2 && buttonId == 2)) {
                count--;
            } else {
                count++;
            }
            likeCount.textContent = count;
            localStorage.setItem(`likeCount${buttonId}`, count);

            if (buttonId == 1) {
                hasPostLiked1 = !hasPostLiked1;
            } else if (buttonId == 2) {
                hasPostLiked2 = !hasPostLiked2;
            }
        });
    });
});