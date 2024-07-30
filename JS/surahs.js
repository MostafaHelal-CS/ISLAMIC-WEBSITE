let theSurahs=document.querySelector(".surahs");
let surahContent=document.querySelector(".surahContent");

function gettingSurah () {
    fetch("http://api.alquran.cloud/v1/quran/edition")
        .then((response) => response.json())
        .then(result => {
            const surahsFragment=document.createDocumentFragment();

            result.data.surahs.forEach((surah, i) => {
                let surahsContainer=document.createElement("div");
                surahsContainer.className="surah";
                surahsContainer.dataset.index=i;

                let arabicSurah=document.createElement('div');
                arabicSurah.className="surahByArabic";

                let div=document.createElement('div');
                div.className="surahdetails";

                let surahdetail=document.createElement("p");
                surahdetail.className="surahArabicName";

                let surahNumber=document.createElement("span");
                surahNumber.innerHTML=` [ ${surah.number} ] `;

                let surahName=document.createElement("span");
                surahName.textContent=`${surah.name}`;

                surahdetail.append(surahNumber, surahName);

                let ayahsNumber=document.createElement("p");
                ayahsNumber.textContent=`[ ${surah.ayahs.length} ]  أيات`;

                div.append(surahdetail, ayahsNumber);
                arabicSurah.append(div);

                // Surah by English
                let EnglishSurah=document.createElement('div');
                EnglishSurah.className="surahByEng";

                let divSurahEng=document.createElement('div');
                divSurahEng.className="surahdetails";

                let surahEngdetail=document.createElement("bdi");
                surahEngdetail.className="surahEngName";

                let surahEngNumber=document.createElement("span");
                surahEngNumber.textContent=` [ ${surah.number} ] `;

                let surahEngName=document.createElement("span");
                surahEngName.textContent=`${surah.englishName}`;

                surahEngdetail.append(surahEngNumber, surahEngName);

                let ayahsEngNumber=document.createElement("bdi");
                ayahsEngNumber.className="ayahsNum";
                ayahsEngNumber.textContent=` [ ${surah.ayahs.length} ] Ayahs `;

                divSurahEng.append(surahEngdetail, ayahsEngNumber);
                EnglishSurah.append(divSurahEng);

                surahsContainer.append(arabicSurah, EnglishSurah);
                surahsFragment.appendChild(surahsContainer);
            });

            theSurahs.appendChild(surahsFragment);

            // Event delegation for surah click
            theSurahs.addEventListener("click", (e) => {
                let surahDiv=e.target.closest(".surah");
                if(surahDiv) {
                    let index=parseInt(surahDiv.dataset.index);
                    displaySurah(result.data.surahs, index);
                }
            });
        });
}

function displaySurah (surahs, index) {
    theSurahs.classList.add("toggleBtn");
    surahContent.innerHTML="";

    let divSurahContainer=document.createElement("div");
    divSurahContainer.className="surahText";

    let div=document.createElement("div");
    div.className="nameSurahText";

    let surahname=document.createElement("p");
    surahname.className="sname";
    surahname.innerHTML=`${surahs[index].name}`;
    div.append(surahname);
    surahContent.append(div, divSurahContainer);

    surahs[index].ayahs.forEach((ayah, j) => {
        let ayaDiv=document.createElement("div");
        ayaDiv.className="ayahDiv";
        ayaDiv.innerHTML=` ${ayah.text}  [${j+1}] `;
        divSurahContainer.append(ayaDiv);
    });

    buttons(surahs, index);
}

function buttons (surahs, currentIndex) {
    let nextAndPrevious=document.createElement("div");
    nextAndPrevious.className="nextAndPreviousBtn";

    let next=document.createElement("i");
    next.className="fa-solid fa-less-than next";
    let previous=document.createElement("i");
    previous.className="fa-solid fa-greater-than previous";

    nextAndPrevious.append(next, previous);
    surahContent.append(nextAndPrevious);

    next.addEventListener("click", () => {
        let nextIndex=(currentIndex+1)%surahs.length;
        displaySurah(surahs, nextIndex);
    });

    previous.addEventListener("click", () => {
        let previousIndex=(currentIndex-1+surahs.length)%surahs.length;
        displaySurah(surahs, previousIndex);
    });
}

gettingSurah();
