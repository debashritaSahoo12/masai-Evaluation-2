function createStudentManager() {
  let students = {};
  return {
    addStudent: function (name) {
      if (!students[name]) {
        students[name] = {
          name,
          subject: {},
        };
      }
    },
    updateScore: function (name, subject, score) {
      if (students[name]) {
        if (students[name]) {
          students[name].subject[subject] = score;
        }
      }
    },
    getStudentDetails: function (name) {
      if (students[name]) {
        return students[name];
      } else {
        return "Student Not Found";
      }
    },
    addSubject: function (name, subject, score) {
      if (students[name]) {
        students[name].subject[subject] = score;
      }
    },
    getSortedStudents: function (sortBy) {
      return Object.values(students)
        .map((student) => {
          let scores = Object.values(student.subject);
          let avg = scores.reduce((a, b) => a + b, 0);
          return { ...students, avg };
        })
        .sort((a, b) => {
          if (sortBy == "averageScore") {
            return b.avg - a.avg;
          } else if (sortBy == "name") {
            return a.name.localeCompare(b.name);
          }
        });
    },
    generateInsight: function () {
      let insights = {
        topPerformers: [],
        difficultSub: {},
        failedStudent: [],
        frequencysub: {},
      };
      let studentData=Object.values(students).map((student)=>{
        let score=Object.values(student.subject);
        let avg=score.reduce((acc,[_,scores])=>acc+scores,0)/score.length
        if(avg>85){
            insights.topPerformers.push(student.name)

        }
        if(score.some(([,score])=>score<35)){
            insights.failedStudent.push(student.name)
        }
        score.forEach(([subject])=>{
            insights.frequencysub[subject]=(insights.frequencysub[subject]||0)+1
        })
        return {...student,avg}
      })
      let subCount={}
      studentData.forEach(student=>{
        Object.entries(student.subject).forEach(([subject,score])=>{
            if(!subCount[subject]){
                subCount[subject]={count:0,lessThan40:0}
            }
            subCount[subject].count++
            if(score<40){
                subCount[subject].lessThan40++
            }
        })
      })
      Object.entries(subCount).forEach(([subject,{count,lessThan40}])=>{
        if(lessThan40/count>0.5){
            insights.difficultSub[subject]=`${((lessThan40/count)*100).toFixed(2)}%`
        }
      })
      return insights
    },
  };
}

let performer=createStudentManager()
performer.addStudent("Miki")
performer.addStudent( "Deba");
performer.updateScore("Miki","Math",90)
performer.updateScore("Deba","Eng",33)
console.log(performer.getStudentDetails("Miki"))
console.log(performer.getSortedStudents("averageScore"));
console.log(performer.generateInsight());
