// Fixed Nav and class Active with background color
let fixedNav = document.getElementById("nav");
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('NavActive') : fixedNav.classList.remove('NavActive');
})

// Explore btn /************************************************************** */
let exploreBtn = document.querySelector('.btn');
let HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click', ()=>{
    HadithSection.scrollIntoView({
        behavior: "smooth"
    })
})



// Hadith Changer with next and previous btns /************************************************************ */
let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev'),
    number = document.querySelector('.number'),
    HadithIndex = 0;


hadithChanger(); // fetch Hadith Data From Api 
function hadithChanger(){
    fetch('https://ahadith-api.herokuapp.com/api/ahadith/all/ar-tashkeel')
    .then(Response => Response.json())
    .then(data =>{
        // console.log(data.AllChapters)
        let Hadithss = data.AllChapters;
        console.log(Hadithss[0].Ar_Text)       
        
        // Next Btn
        next.addEventListener('click',()=>{
            HadithIndex ++;
            calcHadith();
        })

        // Previous Btn
        prev.addEventListener('click',()=>{
            HadithIndex --;
            calcHadith();
        })
        
        function calcHadith(){
            hadithContainer.innerText = Hadithss[HadithIndex].Ar_Text; 
            number.innerHTML = `${Hadithss.length} / ${HadithIndex + 1}`
        }
        calcHadith();

    })

}

// Link Sections and add + remove class active &&& access section with dataset and data filter in index 
let Sections = document.querySelectorAll('section'),
    links = document.querySelectorAll('li');

links.forEach(link =>{
    link.addEventListener('click',()=>{
        // document.querySelector('ul li .active').classList.remove('active')
        document.querySelector('.active').classList.remove('active')
        link.classList.add('active');

        let targetSection = link.dataset.filter; // dataset .filter from data filter in index 
        Sections.forEach(section =>{
            if(section.classList.contains(targetSection)){
                section.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
    })
})


//Fetch Api Quran surha name 
let surahsContainer = document.querySelector('.surhasContainer');
getSurahs();
function getSurahs(){
    fetch('http://api.alquran.cloud/v1/meta')
    .then(respone => respone.json())
    .then(data =>{
        console.log(data)
        let surhas = data.data.surahs.references; //from api json
        console.log(surhas[0])

        // Surah Name 
        let numberOfSurahs = data.data.surahs.count;
        surahsContainer.innerHTML = '';
        for (let i = 0; i < numberOfSurahs; i++) {
            surahsContainer.innerHTML += `
                <div class="surha">
                    <p>${surhas[i].name}</p>
                    <p>${surhas[i].englishName}</p>
                </div>
                `
        }

        // All Surahs Names After Fecth from Api
        let surahsName = document.querySelectorAll('.surha')
        console.log(surahsName) //114
        let popUp = document.querySelector('.surah-popUp')
        let ayatContainer = document.querySelector('.ayat');

        surahsName.forEach((title,index) =>{
            // console.log(surahName);
            // console.log(index);
            title.addEventListener('click',()=>{
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(respone => respone.json())
                .then(data =>{
                    // console.log(data)
                    ayatContainer.innerHTML = '';
                    let Ayat = data.data.ayahs;
                    // console.log(Ayat)
                    Ayat.forEach(aya=>{
                        popUp.classList.add('active');
                        ayatContainer.innerHTML += `
                            <p>${aya.numberInSurah} )&nbsp ${aya.text}</p>
                        `
                    })
                })
            })
        })

        let closePopUp = document.querySelector('.close-popUp');
        closePopUp.addEventListener('click', ()=>{
            popUp.classList.remove('active')
        })
    })
}

//Fetch Api Pray Times
getPrayTimes()
let cards = document.querySelector('.cards');
function getPrayTimes(){
    fetch('http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')
    .then(respons => respons.json())
    .then(data =>{
        console.log(data.data.timings)
        let timings = data.data.timings;
        console.log(timings)
        cards.innerHTML = '';
        for (let time in timings) {
          console.log(time)
          cards.innerHTML += `
          <div class="card">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                    <div class="prayTime">${timings[time]}</div>
                </div>
                <p>${time}</p>
            </div>
          `
        }
    })
}


// Active sidebar
let bars = document.querySelector('.bars'),
    sidebar = document.querySelector('.header ul');

bars.addEventListener('click',()=>{
    sidebar.classList.toggle('active');
})




