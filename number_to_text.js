var titles = new Array();
var ricxvi;

init();

function init() {
    expandTitlesArray();
}

function expandTitlesArray() {
    //შევავსოთ მასივი 10^20-მდე რიცხვების სახელწოდებებით
    titles = [
        "ათას", "მილიონ", "მილიარდ",
        "ტრილიონ", "კვადრილიონ", "კვინტილიონ",
        "სექსტილიონ", "სეპტილიონ", "ოქტილიონ",
        "ნონილიონ", "დეცილიონ", "უნდეცილიონ",
        "დუოდეცილიონ", "ტრედეცილიონ", "კვატტუორდეცილიონ",
        "კვინდეცილიონ", "სექსდეცილიონ", "სეპტდეცილიონ",
        "ოქტოდეცილიონ", "ნოვემდეცილიონ",
    ];

    //ვიმახსოვრებთ პრეფიქსებს დანარჩენი სახელწოდებების დასაგენერირებლად
    var firstPrefixes = [
        "", "უნ", "დუო", "ტრეს", "ქვატუორ", "ქვინქვა", "სეს", "სეპტენ", "ოქტო", "ნოვენ"
    ]
    var secondPrefixes = [
        "", "დეცი", "ვიგინტი", "ტრიგინტა", "ქვადრაგინტა", "ქვინქვაგინტა",
        "სექსაგინტა", "სეპტუაგინტა", "ოქტოგინტა", "ნონაგინტა"
    ];

    var suffixes = [
        "ლიონ", "ცენტილიონ", "დუცენტილიონ", "ტრეცენტილიონ", "ქვადრინგენტილიონ",
        "ქვინგენტილიონ", "სესგენტილიონ", "სეპტინგენტილიონ", "ოქტინგენტილიონ", "ნონგენტილიონ"
    ];

    //ვაგენერირებთ რიცხვებს
    for (var h = 0; h < suffixes.length; h++) {
        for (var i = 0; i < secondPrefixes.length; i++) {
            for (var j = 0; j < firstPrefixes.length; j++) {
                if (!(h == 0 && i <= 1))  //ეს რიცხვები უკვე ჩაყრილი გვაქვს
                    titles.push(firstPrefixes[j] + secondPrefixes[i] + suffixes[h]);
            }
        }
    }

    //ვამატებთ ბოლო რიცხვის სახელწოდებას რაც გაგვიგია
    titles.push("მილინილიონ");
}

function atasamde(number) {
    var numbers = {};

    numbers[1] = "ერთი";

    numbers[2] = "ორ";
    numbers[3] = "სამ";
    numbers[4] = "ოთხ";
    numbers[5] = "ხუთ";
    numbers[6] = "ექვს";
    numbers[7] = "შვიდ";

    numbers[8] = "რვა";
    numbers[9] = "ცხრა";
    numbers[10] = "ათი";
    numbers[11] = "თერთმეტი";
    numbers[12] = "თორმეტი";
    numbers[13] = "ცამეტი";
    numbers[14] = "თოთხმეტი";
    numbers[15] = "თხუთმეტი";
    numbers[16] = "თექვსმეტი";
    numbers[17] = "ჩვიდმეტი";
    numbers[18] = "თვრამეტი";
    numbers[19] = "ცხრამეტი";

    numbers[20] = "ოც";
    numbers[40] = "ორმოც";
    numbers[60] = "სამოც";
    numbers[80] = "ოთხმოც";

    numbers[100] = "ას";

    // თუ 0-მა აქამდე მოაღწია, ე.ი. შუანა ნაწილია და შესაბამისად ცარიელ სიმბოლოს ვაგზავნით
    if (number == 0) return "";

    //გადაყვანა 20-ზე ნაკლებებისთვის
    if (number < 20) {
        if (number > 1 && number < 8)
            return numbers[number] + "ი";
        else return numbers[number];
    }

    //გადაყვანა 100-ზე ნაკლებებისთვის
    if (number < 100) {
        if (number == 20 || number == 40 || number == 60 || number == 80) return numbers[number] + "ი";
        return numbers[Math.floor(number / 20) * 20] + "და" + atasamde(number % 20);
    }

    //გადაყვანა 1000-ზე ნაკლებებისთვის
    if (number == 100) return numbers[number] + "ი";
    if (number < 200) return numbers[100] + atasamde(number % 100);
    if (number % 100 == 0) return numbers[Math.floor(number / 100)] + numbers[100] + "ი";
    return numbers[Math.floor(number / 100)] + numbers[100] + atasamde(number % 100);
}

function convertToGeorgian(value) {
    var number = value.toString();

    if (number === "0") return "ნული";
    if (number === "1") return "ერთი";

    // ვამოწმებთ მიმდევრობას თუ შედგება  ციფრებისგან და ხომ არ არის გრძელი
    if (!(/^\d+$/.test(value))) return "Invalid Input";
    //if (!Regex.IsMatch(number, @"^[1-9]\d*$")) return "Invalid Input";
    if (number.length >= titles.length * 3 + 4) return "number length exceeds";


    // ვაცხადებთ მასივს რომელშიც შევინახავთ ათასეულებს მაგალითად 723-ს
    var splittedNumbers = []//new int[(number.Length - 1) / 3 + 1]; //

    //ვავსებთ მასივს ათასეულებით
    var splittedIndex = 0;

    for (var i = 0; i < number.length; i += 3, splittedIndex++) {
        if ((number.length % 3 == 2) && i == 0) {
            splittedNumbers[splittedIndex] = Number(number.substring(i, i + 2));
            i -= 1;
        }
        else if ((number.length % 3 == 1) && i == 0) {
            splittedNumbers[splittedIndex] = Number(number.substring(i, i + 1));
            i -= 2;
        }
        else
            splittedNumbers[splittedIndex] = Number(number.substring(i, i + 3));
    }


    var result = "";
    //ვაბრუნებთ მასივის ელემენტებს მათზე მოსახერხებლად მანიპულირებისთვის
    // Array.Reverse(splittedNumbers);
    splittedNumbers.reverse();



    for (var i = splittedNumbers.length - 1; i >= 0; i--) {
        //თითოეული ათასეული გადაგვყავს რიცხვში მაგ 723 = შვიდასოცდასამი
        var ataseulebamde = atasamde(splittedNumbers[i]);

        //თუ ნული არ არის 
        if (splittedNumbers[i] > 1||i==0)
            result += ataseulebamde;

        if (i != 0 && ataseulebamde.length > 0)
            result += " " + titles[i - 1] + " ";

        if (i == 0 &&
            splittedNumbers[i] == 0 &&
            splittedNumbers.length > 1) result = result.slice(0, result.length - 1) + "ი";
    }
    return result;
}        