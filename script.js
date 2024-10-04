const postCard = document.getElementById("post-card");
const countPost = document.getElementById("count-post");
const selectPost = document.getElementById("select-post");
const latestPost = document.getElementById("latest-post");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
  const searchInput = document.getElementById("search-input").value;
  //console.log(searchInput);

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInput}`
    );
    const data = await res.json();
    //console.log(data.posts);
    if (data && data.posts.length > 0) {
      getAllPosts(data.posts);
      searchInput.value = "";
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
  }
});

var count = 0;
function getPostTitle(post) {
  //console.log(post);
  count;
  if (post) {
    count++;
    countPost.innerHTML = `(${count})`;

    const card = document.createElement("div");

    card.classList = "flex items-center gap-6 bg-white p-2 rounded-xl ";
    card.innerHTML = `
    
                <h2 class="font-bold lg:w-[300px] text-lg text-gray-600">
                  ${post.title}
                </h2>
                <span class="font-semibold"
                  ><i class="fa-regular fa-eye"></i> ${post.view_count}</span
                >
              
    `;

    selectPost.appendChild(card);
  }
}

function getAllPosts(posts) {
  postCard.innerHTML = "";
  posts.forEach((post) => {
    //console.log(post);
    const card = document.createElement("div");
    card.classList =
      "flex flex-col lg:flex-row gap-3 justify-center items-center lg:items-start lg:justify-start p-6 bg-gray-200 rounded-2xl";

    card.innerHTML = `
            
              <div class="relative">
                <img
                  class="w-20 h-16 rounded-xl object-cover"
                  src=${post.image}
                  alt="card-img"
                />
                <div
                  class="absolute -top-1 -right-1 w-4 h-4 ${
                    post.isActive ? "bg-green-500" : "bg-red-500"
                  } rounded-full"
                ></div>
              </div>
              <div class="flex-1">
                <div class="border-gray-500 border-dotted border-b-2 pb-3">
                  <p class="font-semibold text-gray-700 flex gap-6">
                    #${post.category} <span>Author: ${post.author.name}</span>
                  </p>
                  <h2 class="text-xl font-bold py-2">
                    ${post.title}
                  </h2>
                  <p class="text-gray-600">
                    ${post.description}
                  </p>
                </div>
                <div
                  class="flex justify-between  items-center mt-5 font-semibold text-gray-600"
                >
                  <div class="flex gap-4 items-center">
                    <span class="flex items-center gap-2"
                      ><i class="fa-solid fa-message"></i> ${
                        post.comment_count
                      }</span
                    >
                    <span class="flex items-center gap-2"
                      ><i class="fa-regular fa-eye"></i> ${
                        post.view_count
                      }</span
                    >
                    <span class="flex items-center gap-2"
                      ><i class="fa-regular fa-clock"></i> ${
                        post.posted_time
                      }min</span
                    >
                  </div>
                  <div>
                    <span onClick='getPostTitle(${JSON.stringify(post).replace(
                      /'/g,
                      "\\"
                    )})' class="text-white cursor-pointer"
                      ><i
                        class="fa-regular fa-envelope bg-green-400 p-1 rounded-full"
                      ></i
                    ></span>
                  </div>
                </div>
              </div>
            
        `;
    postCard.appendChild(card);
  });
}

function printLatestPost(posts) {
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = "border p-4 rounded-xl";

    card.innerHTML = `
      
            <div>
              <img class="rounded-xl" src=${post.cover_image} alt="logo" />
            </div>
            <div class="flex flex-col mt-5">
              <span class="text-gray-600 font-semibold"
                ><i class="fa-solid fa-calendar-days"></i> ${
                  post.author.posted_date
                    ? post.author.posted_date
                    : "No publish date"
                }</span
              >
              <h1 class="text-xl font-bold py-2">
                ${post.title}
              </h1>
              <p class="text-gray-600 font-semibold">
                ${post.description}
              </p>
              <div class="flex items-center gap-3 mt-3">
                <img
                  class="w-10 h-10 rounded-full object-cover"
                  src=${post.profile_image}
                />
                <div>
                  <h2 class="text-lg font-bold">${post.author.name} </h2>
                  <span class="text-gray-600 font-semibold">${
                    post.author.designation
                      ? post.author.designation
                      : "Unknown"
                  }</span>
                </div>
              </div>
            </div>
         
    `;

    latestPost.appendChild(card);
  });
}

async function fetchAllPosts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    //console.log(data.posts);

    if (data && data.posts.length > 0) {
      getAllPosts(data.posts);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllLatestPosts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    //console.log(data);

    if (data && data.length > 0) {
      printLatestPost(data);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
  }
}

fetchAllPosts();
fetchAllLatestPosts();
