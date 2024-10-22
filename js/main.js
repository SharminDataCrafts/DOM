const milestonesData = JSON.parse(data).data;

// load course milestonesData
function loadMilestones(){
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${milestonesData.map(function(milestone){
        return ` <div class="milestone border-b" id="${milestone._id}">
                    <div class="flex">
                        <div class="checkbox" ><input type="checkbox" onclick="markMilestone(this,  ${milestone._id} )" ></div>
                        <div onClick="openMilestones(this, ${milestone._id})">
                            <p>
                                ${milestone.name}
                                <span><i class="fas fa-chevron-down "></i></span>
                            </p>
                        </div>
                    </div>

                   <div class="hidden_panel">
                        ${milestone.modules.map(function(module){
                            return ` <div class="module border-b">
                            <p>${module.name}</p>
                        </div>`;
                        }).join("")}
                    </div>
               </div>`;
    }).join("")}`;
}


function openMilestones(milestoneElement, id){
    
    const currPanel = milestoneElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector(".show");
    const activeElement = document.querySelector(".active");

    // first remove previous active class if any [other than the clicked one]
    if(activeElement && !milestoneElement.classList.contains("active")){
        activeElement.classList.remove("active")
    }
 
     // toggle current clicked one
    milestoneElement.classList.toggle("active");

    // first hide previous panel if open [other than the clicked element]
    if(!currPanel.classList.contains("show") && shownPanel){
        shownPanel.classList.remove("show");
    }

    // toggle current element
    currPanel.classList.toggle("show");


    showMilestone(id);
}

function showMilestone(id){

    const milestoneImage = document.querySelector(".milestoneImage");
    const milestoneTitle = document.querySelector(".title");
    const milestoneDetails = document.querySelector(".details");

    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestonesData[id].image;
    milestoneTitle.innerText = milestonesData[id].name;
    milestoneDetails.innerText = milestonesData[id].description;
}

// listen for hero image load
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
    this.style.opacity ="1";
}

function markMilestone(checkbox, id){
    const doneList = document.querySelector(".doneList");
    const mileStonesList = document.querySelector(".milestones");
    const item = document.getElementById(id);

    if(checkbox.checked){
        // mark as done
        mileStonesList.removeChild(item);
        doneList.appendChild(item);
        sortingMilestones(doneList)
    }else{
        // back to main list
        doneList.removeChild(item);    
        mileStonesList.appendChild(item);

        sortingMilestones(mileStonesList);
    }

}


 // task - do the sorting
// reload list
function sortingMilestones(list){
    const milestones = Array.from(list.children);
    milestones.sort(function(a,b){
        return parseInt (a.id) - parseInt(b.id);
    })

    list.innerHTML ='';
    for(let milestone of milestones){
        list.appendChild(milestone);
    }
}


loadMilestones();

