/////////////////// calculate GPA ///////////////////
var x = $('.list1').find('td:eq(1)');

// overall GPA
var total_credit = 0;
var grade_points = 0;    
for(var i=0; i<x.length;i++){
    var course = $('.list1').eq(i).find('td:eq(1)').text();
    var score = parseInt($('.list1').eq(i).find('td:eq(4)').text());
    // information filter
    if(course!="操" && course!="勞" && !$.isNumeric(course) && $.isNumeric(score)){
        var credit = parseInt($('.list1').eq(i).find('td:eq(3)').text());
        var score = parseInt($('.list1').eq(i).find('td:eq(4)').text());            
        var point = score_to_point(score);
        total_credit = total_credit + credit;
        grade_points = (credit*point) + grade_points;
       
    }
}
var overall_gpa = (grade_points/total_credit).toFixed(2);

// GPA for required course
var total_credit = 0;
var grade_points = 0;
for(var i=0; i<x.length;i++){
    var course = $('.list1').eq(i).find('td:eq(1)').text();
    var score = parseInt($('.list1').eq(i).find('td:eq(4)').text());    
    // information filter
    if(course=="必" && course!="操" && course!="勞" && !$.isNumeric(course) && $.isNumeric(score)){
        var credit = parseInt($('.list1').eq(i).find('td:eq(3)').text());            
        var point = score_to_point(score);
        total_credit = total_credit + credit;
        grade_points = (credit*point) + grade_points;
       
    }
}
var required_course_gpa = (grade_points/total_credit).toFixed(2);

// GPA for last two years
var total_credit = 0;
var grade_points = 0;
var date = new Date();
var this_semester_year = date.getFullYear()-1911-1; 
for(var i=0; i<x.length;i++){
    var course = $('.list1').eq(i).find('td:eq(1)').text();
    var score = parseInt($('.list1').eq(i).find('td:eq(4)').text());    
    var semester_year = parseInt( ($('.list1').eq(i).find('td:eq(0)').text()) / 10);
    // information filter
    if(semester_year>(this_semester_year-2) && course!="操" && course!="勞" && !$.isNumeric(course) && $.isNumeric(score)){
        var credit = parseInt($('.list1').eq(i).find('td:eq(3)').text());            
        var point = score_to_point(score);
        total_credit = total_credit + credit;
        grade_points = (credit*point) + grade_points;
       
    }
}
var last_two_years_gpa = (grade_points/total_credit).toFixed(2);

/////////////////////////////////////////////////////////

// show GPA on website
var element = document.createElement('div');
element.innerHTML = 
    '<b>' +
    'overall GPA: ' + overall_gpa + '<br/>' +
    'GPA for required course: ' + required_course_gpa + '<br/>' +
    'GPA for last two years: '+ last_two_years_gpa + '<br/>' +
    '</b>';
document.body.appendChild(element);

// change score to point
function score_to_point(score){
    var point;
    switch(true) {
        case (score>=80):
            point = 4;
            break;
        case (score<80 && score>=70):
            point = 3;
            break;
        case (score<70 && score>=60):
            point = 2;
            break;
        case (score<60 && score>=1):
            point = 1;
            break;
        default:
            point = 0;
    }
    return point;
}