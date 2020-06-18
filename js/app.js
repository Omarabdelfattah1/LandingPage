/**
 * Global variables
 */
const nav=document.querySelector("nav ul");
const sections=document.querySelectorAll("section");

// Helper functions

function C_Position() {
    if (self.pageYOffset) return self.pageYOffset;
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function targetPosition(sec_id) {
    var section = document.getElementById(sec_id);
    var y = section.offsetTop;
    var node = section;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


// Generate the navbar dynamically
sections.forEach(element => {
    let li=document.createElement("li");
    let nav_link=document.createElement("a");
    let sec_id=element.getAttribute("id");
    nav_link.innerHTML=element.getAttribute("data-nav");
    nav_link.setAttribute("class","menu__link");
    nav_link.setAttribute("onclick","smooth_scroll('"+sec_id+"')");
    li.appendChild(nav_link);    
    nav.appendChild(li);    
});



function smooth_scroll(sec_id) {
    var startY = C_Position();
    var stopY = targetPosition(sec_id);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}
// Add class 'active' to section when near top of viewport
function inViewPort(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Scroll to anchor ID using scrollTO 
document.addEventListener("scroll",function(){
    sections.forEach(element => {
        if(inViewPort(element))
        {
           
            element.classList.add("your-active-class");
        }else{
            element.classList.remove("your-active-class");
        }
    });
})


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

