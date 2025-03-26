// 1. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// async function fetchPosts() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await response.json();

//     posts.map(async (post) => {
//       try {
//         const commentsReponse = await fetch(
//           `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
//         );
//         const comments = await commentsReponse.json();
//         console.log('Current post is', post);
//         console.log('Comments for the post are', comments);
//       } catch (error) {
//         console.error("Error fetching comments for post ", post.id, error);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
//   .then((posts) => console.log(posts))
//   .catch((error) => console.error(error));
// }
// fetchPosts();

// // 2. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Data fetched successfully!");
//     }, 2000);
//   });
// };

// fetchData()
// 	.then((result) => console.log(result))
// 	.catch((error) => console.error(error));

// async function getData() {
//   try {
//     const response = await fetchData();
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData();

// // 3. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// const fetchUsers = async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     console.log(users);
//     return users;
//   } catch (error) {
//     return error;
//   }
// };

// async function getUsers() {
//   try {
//     const users = await fetchUsers();
//     console.log("Total users:", users.length);
//   } catch (error) {
//     console.error(error);
//   }
// }
// getUsers();

//   // 4. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// const fetchUserData = async () => {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//     const user = await response.json();
//     return user;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// fetchUserData()
//   .then(user => console.log('User data:', user))
//   .catch(error => console.error('Error:', error));

// // 5. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// const getPostsAndComments = async (postId) => {
//   try {
//     const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts/'+ postId);
//     const post = await postResponse.json();
//     const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
//     const comments = await commentsResponse.json();
//     console.log(post, comments);

//     // const postWithCommentsResponse = await Promise.all([
//     //   await fetch("https://jsonplaceholder.typicode.com/posts/" + postId),
//     //   await fetch(
//     //     `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
//     //   ),
//     // ]);
//     // const postWithComments = await Promise.all([
//     //   postWithCommentsResponse[0].json(),
//     //   postWithCommentsResponse[1].json(),
//     // ]);

//     // console.log(postWithComments[0], postWithComments[1]);
//   } catch (error) {
//     console.error(error);
//   }
// };
// getPostsAndComments("1");

// // 6.Convert the function below into asyncrounous function using async/await and try/catch syntax.

const fetchWithTimeout = (url, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(async function () {
      try {
        const response = await fetch(url);
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, timeout);
  });
};

async function getPost() {
  try {
    const posts = await fetchWithTimeout(
      "https://jsonplaceholder.typicode.com/posts",
      2000,
    );
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
}
getPost();