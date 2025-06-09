
let replyBtn = document.querySelectorAll(".reply-btn");
let sendCommentBtn = document.querySelector(".send-comment-btn")
let yourReplyBtn = document.querySelectorAll(".your-reply-btn")
let userRepliedComment = document.querySelector(".user-reply-btn")

replyBtn.forEach((clickedBtn) => {
    clickedBtn.addEventListener("click", () => {
        clickedBtn.parentElement.nextElementSibling.classList.remove("display-none")
    })
})
yourReplyBtn.forEach((replyBtn) => {
    replyBtn.addEventListener("click", () => {
        let userName = replyBtn.dataset.username
        let userComment = replyBtn.parentElement.firstElementChild.nextElementSibling.firstElementChild.value
        if (!userComment) return;
        let commentReply = replyBtn.parentElement.nextElementSibling
        replyBtn.parentElement.classList.add("display-none")
        replyBtn.parentElement.firstElementChild.nextElementSibling.firstElementChild.value = ""
        commentReplyFunc(commentReply, userComment, userName)
    })
})
userRepliedComment.addEventListener("click", () => {
    let userName = userRepliedComment.dataset.username
    let userComment = userRepliedComment.parentElement.firstElementChild.nextElementSibling.firstElementChild.value
    if (!userComment) return;
    let commentReply = userRepliedComment.parentElement.nextElementSibling
    userRepliedComment.parentElement.classList.add("display-none")
    userRepliedComment.parentElement.firstElementChild.nextElementSibling.firstElementChild.value = ""
    someoneElseCommentReply(commentReply, userComment, userName)
})
sendCommentBtn.addEventListener("click", () => {
    let commentText = sendCommentBtn.previousElementSibling.firstElementChild.value
    sendComment(commentText)
    sendCommentBtn.previousElementSibling.firstElementChild.value = ""
})

document.addEventListener("click", function (e) {
    if (e.target.closest(".vote-up")) {
        const voteBtn = e.target.closest(".vote-up");
        const voteValueEl = voteBtn.nextElementSibling;
        let voteValue = parseInt(voteValueEl.textContent);
        voteValueEl.textContent = voteValue + 1;
        voteBtn.disabled = true;
        voteBtn.nextElementSibling.nextElementSibling.disabled = false;
    }

    if (e.target.closest(".vote-down")) {
        const voteBtn = e.target.closest(".vote-down");
        const voteValueEl = voteBtn.previousElementSibling;
        let voteValue = parseInt(voteValueEl.textContent);
        voteValueEl.textContent = voteValue - 1;
        voteBtn.disabled = true;
        voteBtn.previousElementSibling.previousElementSibling.disabled = false;
    }
    if (e.target.closest(".edit-btn")) {
        let editBox = e.target.closest(".edit-btn").parentElement.previousElementSibling.lastElementChild
        editBox.previousElementSibling.classList.add("display-none")
        editBox.classList.remove("display-none")
        let previousText = e.target.closest(".edit-btn").parentElement.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText
        editBox.firstElementChild.value = previousText.replace(/\s+/g, ' ')
    }

    if (e.target.closest(".update-btn")) {
        let updateBtn = e.target.closest(".update-btn")
        let updatedText = updateBtn.previousElementSibling.value
        console.log(updatedText);
        let textTagParent = updateBtn.parentElement.previousElementSibling
        textTagParent.firstElementChild.innerText = updatedText
        textTagParent.classList.remove("display-none")
        updateBtn.parentElement.classList.add("display-none")
    }

    if (e.target.closest(".delete-btn")) {
        let deleteBtn = e.target.closest(".delete-btn")
        document.querySelector("footer").classList.remove("display-none")
        document.querySelector(".reject").addEventListener("click", () => {
            document.querySelector("footer").classList.add("display-none")
        })
        document.querySelector(".accept").addEventListener("click", () => {
            deleteBtn.parentElement.parentElement.remove()
            document.querySelector("footer").classList.add("display-none")
        })
    }
});

function commentReplyFunc(commentReply, replyText, userName) {
    commentReply.insertAdjacentHTML("afterbegin", `
        <div class="replied-comment-section">
            <div class="replied-comment-vote">
                <button class="replied-comment-vote-up vote-up">
                    <img src="images/icon-plus.svg" alt="vote">
                </button>
                <div class="replied-comment-vote-value">0</div>
                <button class="replied-comment-vote-down vote-down">
                    <img src="images/icon-minus.svg" alt="vote-down">
                </button>
            </div>
            <div class="replied-user-comment-section">
                <div class="replied-user-profile">
                    <div class="replied-user-avatar">
                        <img src="images/avatars/image-juliusomo.webp" alt="juliusomo">
                    </div>
                    <div class="replied-user-name">
                        <p>juliusomo <span>you</span></p>
                    </div>
                    <div class="replied-user-comment-duration">
                        <p>just now</p>
                    </div>
                </div>
                <div class="replied-user-text">
                    <p><span class="respondend-name">@${userName}</span> ${replyText}</p>
                </div>
                <div class="edit-comment-section display-none">
                    <textarea name="edit-comment-1" id="edit-comment-1"></textarea>
                    <div class="update-btn">update</div>
                </div>
            </div>
            <div class="delete-edit-btn">
                <div class="delete-btn">
                    <img src="images/icon-delete.svg" alt="delete-btn">
                    <p class="delete-text">delete</p>
                </div>
                <div class="edit-btn">
                    <img src="images/icon-edit.svg" alt="edit-btn">
                    <p class="edit-text">edit</p>
                </div>
            </div>
        </div>
    `);


}
function someoneElseCommentReply(commentReply, replyText, userName) {
    commentReply.insertAdjacentHTML("beforebegin", `
        <div class="replied-comment-section">
            <div class="replied-comment-vote">
                <div class="replied-comment-vote-up">
                    <img src="images/icon-plus.svg" alt="vote">
                </div>
                <div class="replied-comment-vote-value">0</div>
                <div class="replied-comment-vote-down">
                    <img src="images/icon-minus.svg" alt="vote-down">
                </div>
            </div>
            <div class="replied-user-comment-section">
                <div class="replied-user-profile">
                    <div class="replied-user-avatar">
                        <img src="images/avatars/image-juliusomo.webp" alt="juliusomo">
                    </div>
                    <div class="replied-user-name">
                        <p>juliusomo <span>you</span></p>
                    </div>
                    <div class="replied-user-comment-duration">
                        <p>just now</p>
                    </div>
                </div>
                <div class="replied-user-text">
                    <p><span class="respondend-name">@${userName}</span> ${replyText}</p>
                </div>
                <div class="edit-comment-section display-none">
                    <textarea name="edit-comment-1" id="edit-comment-1"></textarea>
                    <div class="update-btn">update</div>
                </div>
            </div>
            <div class="delete-edit-btn">
                <div class="delete-btn">
                    <img src="images/icon-delete.svg" alt="delete-btn">
                    <p class="delete-text">delete</p>
                </div>
                <div class="edit-btn">
                    <img src="images/icon-edit.svg" alt="edit-btn">
                    <p class="edit-text">edit</p>
                </div>
            </div>
        </div>
    `);
}
function sendComment(commentText) {
    document.querySelector(".comment-container").insertAdjacentHTML("afterbegin", `<div class="comment-card" style = "width:39rem" >
                <div class="vote">
                    <button class="vote-up">
                        <img src="images/icon-plus.svg" alt="vote-up">
                    </button>
                    <div class="vote-value">0</div>
                    <button class="vote-down">
                        <img src="images/icon-minus.svg" alt="vote-down">
                    </button>
                </div>
                <div class="comment-section">
                    <div class="user-profile">
                        <div class="user-avatar">
                            <img src="images/avatars/image-amyrobson.png" alt="amyrobson">
                        </div>
                        <div class="user-name">
                            <p>amyrobson</p>
                        </div>
                        <div class="comment-duration">
                            <p>1 month ago</p>
                        </div>
                    </div>
                    <div class="comment-text">
                        <p>${commentText}</p>
                    </div>
                </div>
                <div class="reply-btn">
                    <img src="images/icon-reply.svg" alt="reply">
                    <div class="reply-text">reply</div>
                </div>
            </div>
            <div class="reply-box display-none">
                <div class="your-img">
                    <img src="images/avatars/image-juliusomo.webp" alt="juliusomo">
                </div>
                <div class="text-box">
                    <textarea name="new-textarea"></textarea>
                </div>
                <div class="your-reply-btn">
                    <p>reply</p>
                </div>
            </div>
            <div class="comment-reply display-none">
            </div>`)
}
// Attach a single event listener to a common container


