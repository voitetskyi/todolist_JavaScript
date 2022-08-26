let today = new Date().toLocaleDateString();
console.log(today);

var s = "This., -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation";
console.log(s);
var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
console.log(punctuationless);
var punctuationless1 = s.replace(/[.,\/#!$%\^&\*;:{}=\-_ `~()]/g,"");
console.log(punctuationless1);
var finalString = punctuationless.replace(/\s{2,}/g," ");
console.log(finalString);

class Tasks {
    constructor(done, name, description, duedate, list_name, id) {
        this.done = done
        this.name = name
        this.description = description
        this.duedate = new Date(duedate)
        this.list_name = list_name
        this.id = id
    }
}
let tasks = [
    new Tasks(false, 'Пройти опитування', 'Пройти опитування', '2022-09-09', 'Тренінг з безпеки', 1),
    new Tasks(true, 'Реєстрація на TechTalk', 'Зареєструватись на TechTalk, який пройде 25.08.22 о 09:00. Поговоримо про багаторічну традицію нашої компанії — шаринг знань та традиційний івент з багаторічною історією.', '2022-09-09', 'Івенти', 2),
    new Tasks(false, 'Реєстрація на MeetUp', 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00', '2022-08-23', 'Івенти', 3),
    new Tasks(false, 'Пройти опитування', 'Пройти опитування', '2022-09-09', 'Test', 4),
    new Tasks(true, 'Реєстрація на TechTalk', 'Зареєструватись на TechTalk, який пройде 25.08.22 о 09:00.', '2022-09-09', 'Test', 5),
    new Tasks(false, 'Реєстрація на MeetUp', 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00', '2022-08-23', 'Test', 6)

]

for (i of tasks) console.log(i);