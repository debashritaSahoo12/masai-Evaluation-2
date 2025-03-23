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
          generateInsights : function (){
            let insights = {
                topPerformers : [],
                difficultSub : {},
                failedStudents : [],
                subFrequency : {}
            };

            let studentData = Object.values(students).map(student =>{
                let scores = Object.entries(student.subject);
                let avgScore = scores.length ? scores.reduce((acc, [_, score])=> acc + score, 0) / scores.length : 0;

                if(avgScore > 85) insights.topPerformers.push(student.name);
                if(scores.some(([_, score])=> score < 35)) insights.failedStudents.push(student.name);

                scores.forEach(([subject])=>{
                    insights.subFrequency[subject] = (insights.subFrequency[subject] || 0) + 1;
                });

                return {...student, avgScore};
            });

            let subjectCounts = {};
            studentData.forEach(student => {
                Object.entries(student.subject).forEach(([subject, score]) => {
                    if(!subjectCounts[subject]) subjectCounts[subject] = {count:0, below40:0};
                    subjectCounts[subject].count++;
                    if(score < 40) subjectCounts[subject].below40++;
                });
            });

            Object.entries(subjectCounts).forEach(([subject, {count, below40}]) => {
                if(below40 / count > 0.5) insights.difficultSub[subject] =` ${((below40 / count) * 100).toFixed(2)}% `;
            });

            return insights;
        }
    };

}

let performer=createStudentManager()
performer.addStudent("Miki")
performer.addStudent( "Deba");
performer.updateScore("Miki","Math",90)
performer.updateScore("Deba","Eng",33)
console.log(performer.getStudentDetails("Miki"))
console.log(performer.getSortedStudents("averageScore"));
console.log(performer.generateInsights());
