function fetchPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = [
                { title: "Post 1", body: "This is post 1" },
                { title: "Post 2", body: "This is post 2" },
            ];
            resolve(posts);
        }, 2000);
    });
}

function fetchComments() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const comments = [
                { postId: 1, comment: "Comment 1" },
                { postId: 2, comment: "Comment 2" },
            ];
            resolve(comments);
        }, 3000);
    });
}

async function fetchPostsAndComments() {
    try {
        // const posts = await fetchPosts();
        // console.log("Posts fetched:", posts);

        // const comments = await fetchComments();
        // console.log("Comments fetched:", comments);

        const [posts, comments] = await Promise.all([fetchPosts(), fetchComments()]);
        console.log("Posts fetched:", posts);
        console.log("Comments fetched:", comments);

        const [postsRace , commentsRace] = await Promise.race([fetchPosts(), fetchComments()]);
        console.log("Posts fetched:", postsRace);
        console.log("Comments fetched:", commentsRace);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchPostsAndComments();
