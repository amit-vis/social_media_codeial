{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    if (data.error){
                        new Noty({
                            text: 'Error in adding a post' + data.error,
                            type: 'error'
                        }).show();
                    }else{
                        new Noty({
                            text: 'Post added',
                            type: 'success'
                        }).show();
                    }
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error)
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function(i){
        return $(`<li id="post-${i._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/post/destroy/${ i._id }">X</a>
            </small>
        ${i.content}
        <br>
        <small>
            ${i.user.name}
        </small>
    </p>
    <div class="post-comment">
            <form action="/comment/create" method="post">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${ i._id}">
                <input type="submit" value="Add Comment">
            </form>
        <div class="post-comments-list">
            <ul id="post-comment-${i._id }">
            </ul>
        </div>
    </div>
    </li> `)
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    let newComment = newCommentDom(data.data.comment);
                    $('#post-comments-list>ul').prepend(newComment);
                }
            });
        })
    }

    
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'comment',
                url: '/comment/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);

                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to create a comment in Dom
    let newCommentDom = function(comment){
        return $(`<li id="comment-${ comment.id }">
        <p>
            <small>
                <a href="/comment/destroy/${comment.id }">X</a>
            </small>
            ${ comment.content }
            <br>
            <small>
                ${ comment.user.name }
            </small>
        </p>
    </li>`)
    }


    createPost();
}

// method to submit the form data for new comment using AJAX