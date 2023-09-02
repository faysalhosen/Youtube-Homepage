const loadData = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json();
    const videos = data.data;
    displayCard(videos)
}
loadData(1000);
const sortData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const videos = data.data;
    function sort(videos){
        return  videos.sort((b, a) => parseFloat(a.others.views) - parseFloat(b.others.views));
    }
    const sortDataArray = sort(videos);
    displayCard(sortDataArray);
}
const displayCard = (videos) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = '';
    const errorContainer = document.getElementById('error-container');
    if(videos.length === 0 ){
        errorContainer.classList.remove('hidden');
    }
    else{
        errorContainer.classList.add('hidden');
    }
    videos.forEach((video) => {
        let hr = 0;
        let min = 0;
        function secondToHourMinute(second) {
            const hour = Math.floor(second / 3600);
            const minute = Math.floor((second % 3600) / 60);
            hr = hour;
            min = minute;
        }
        secondToHourMinute(video.others.posted_date);
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="mb-5"> 
        <div class="mb-4 relative"> 
            <img class="rounded-lg w-full h-48" src="${video.thumbnail}" alt="">
            <div id="time" class="">
                <div class="absolute bg-zinc-700 rounded text-white left-40 bottom-4">
                    <div>
                    <p class="text-lg w-full"><span id="hr">${video.others.posted_date ? `&nbsp&nbsp${hr} hrs ${min} min ago` : ''}</span><span id="min"></span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-2">
            <div class=""> 
                <img class="rounded-full h-10 w-10" src="${video.authors[0].profile_picture}" alt="">
            </div>
            <div class="">  
                <h4 class="font-bold">${video.title}</h4>
            </div>
        </div>
        <div class="ml-12"> 
            <div class="flex gap-1 w-full">
                <h6 class="font-normal"><span>${video.authors[0].profile_name}</span></h6>
                <span>${video.authors[0].verified ? `<img src="./image/fi_10629607.png" alt="">` : ''}</span>
            </div>
            <p><span>${video.others.views}</span>views</p>  
        </div>
    </div>
    `
        cardContainer.appendChild(div)
    })
}






let sortDataId = 1000;
const buttonAll = (id) => {
    loadData(id);
    sortDataId = 1000;
}
const buttonMusic = (id) => {
    loadData(id);
    sortDataId = 1001;
}
const buttonComedy = (id) => {
    loadData(id);
    sortDataId = 1003;
}
const buttonDrawing = (id) => {
    loadData(id);
    sortDataId = 1005;
}
const btnSort = () => {
    sortDataId = sortDataId;
    sortData(sortDataId);
}


const buttonContainer = document.getElementById('button-container')
buttonContainer.innerHTML = `
<div class="flex justify-center gap-5">
        <button onclick="buttonAll(1000)" class="bg-gray-300 hover:bg-red-500 text-white px-5 text-xl p-2 rounded-md">All</button>
        <button onclick="buttonMusic(1001)" class="bg-gray-300 px-5 text-xl rounded-md">Music</button>
        <button onclick="buttonComedy(1003)" class="bg-gray-300 px-5 text-xl rounded-md"> Comedy</button>
        <button onclick="buttonDrawing(1005)" class="bg-gray-300 px-5 text-xl rounded-md">Drawing</button>
</div>
`
const navContainer = document.getElementById('nav-container');
navContainer.innerHTML = `
    <div class="flex justify-center mt-4 mx-5">
    <div class="w-full flex justify-start   "><img src="logo/Logo.png" alt=""></div>
    <div class="w-full flex justify-center"><p onclick="btnSort()" class="bg-gray-300 px-3 pt-2 text-center font-semibold text-xl rounded-md"> sort by view </p></div>
    <div class="w-full flex justify-end"><a href="./page/blog.html"><button class="bg-red-500 px-3 py-2 text-xl text-white px-3xl rounded-md ">Blog</button></a></div>
    </div>
`