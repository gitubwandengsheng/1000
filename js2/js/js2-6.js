var a = sessionStorage.getItem("id");
var man = document.getElementById("mans");
var killer = sessionStorage.getItem("player");
var id = a.split(",");
console.log(id)
var gameother = sessionStorage.getItem("$stage")
console.log("gameother")
console.log(gameother);

//提取标记
var time = sessionStorage.getItem("time")
console.log("time")
if (time<3) {
    time++
}
console.log(time)
sessionStorage.setItem("onetime",time)
//获取天数判断
var day = sessionStorage.getItem("day");
if (gameother =="4") {
    day++
    
}
sessionStorage.setItem("day",day)
console.log("day")
console.log(day);
if (day == 1) {
    //获取最初值的所有活人状态的对象数组
    var playerState = JSON.parse(sessionStorage.getItem("ayerState"))
} else if (day !== 1) {
    //获取保存后杀人数据后的对象数组
    var playerState = JSON.parse(sessionStorage.getItem("playerState"))



}

// 获取对象数据
console.log(playerState);

// 获取刷新的对象数据
// var livenum = 0
// for (let p = 0; p < playerState.length; p++) {
//     if (playerState[p].state = "live") {
//         livenum++

//     }


// }
// console.log(livenum)
// console.log("this")
// console.log(playerState.length)
// if (livenum !== playerState.length) {

// }


var box = function () {
    for (var i = 0; i < id.length; i++) {
        var div = document.createElement("div");
        var text = document.createElement("p");
        var number = document.createElement("p");
        div.className = "wrap";
        text.textContent = id[i];
        number.className = "playText";
        number.textContent = (i + 1) + "号";
        div.appendChild(text);
        div.appendChild(number);
        man.appendChild(div);

    }

};
box();
var alive;

// for (var i = 0;i < id.length;i++){
//     var div = document.createElement("div");
//     var text = document.createElement("p");
//     var number = document.createElement("p");
//     div.className = "wrap";
//     text.textContent = id[i];
//     number.className = "playText";
//     number.textContent = (i+1)+"号";
//     div.appendChild(text);
//     div.appendChild(number);
//     man.appendChild(div);

// }
// 身份牌
var inner = "";
var item = function () {
    for (i = 0; i < id.length; i++) {
        inner += box.outlineHTML;
        $(".maind4").html(inner)
    }

};
item();

// var num = function () {
//     for (i = 0 ; i < id.length; i++) {
//         $(".num")[i].textContent= i +1 +"号";
//         id[i] === "杀手"?$(".text")[i].textContent = "杀手":$(".text")[i].textContent = "平民";
//     }

// };

// var playerState = [];
// for (let i = 0; i < id.length; i++) {
//     playerState[i] = {
//         identity: id[i],
//         num: i + 1,
//         state: "live",
//         way: "",
//         // day : date

//     };

// };
console.table(playerState);
// 死人状态颜色变化
$(".wrap").css("outline", "3px solid #fff");

// 杀人杀人点击效果函数
var i;
$(".wrap").on("click", function () {
    $(".wrap").css("outline", "3px solid #fff");
    for (let f = 0; f < id.length; f++) {
        playerState[f].way = ""

    }
    var i = $(this).index();
    sessionStorage.setItem("index", i)
    // if (playerState[i].num ===cc+1) {
    //     // alert("死人你也要杀啊")

    // }


    if (playerState[i].identity === "平民" && playerState[i].state == "live") { //判断选取所在索引对象是否为死亡状态和平民
        alive = 4;

        playerState[i].way = "killed"
        // playerState[i].state = "dead"

        $(this).css("outline", "3px solid #f00");

    } else if (playerState[i].state === "dead") { //判断选取所在索引对象是否为死亡状态
        alert("死人你也要杀啊") //
        alive = 3;

    } else if ($(this).find("p").html() == "杀手" && gameother == "1") { //判断选取所在索引对象是否为死杀手
        alert("别杀我，自己人")
        alive = 3;
    } else if ($(this).find("p").html() == "杀手" && gameother == "4") {
        playerState[i].way = "killed"

        $(this).css("outline", "3px solid #f00");

        alive = 4;
    }


    console.log(i);

})
var killNum = 0
for (let f = 0; f < playerState.length; f++) {
    if (playerState[f].state === "live" && playerState[f].identity === "杀手") {
        killNum++;



    }

}
console.log(killNum);
console.log(playerState.length)
console.log(killNum);
console.log(killNum);
var civNum = 0
var killLive = 0

//判断杀人页面样式
if (gameother == "4") {
    $(".center").text("全名投票");
    $(".onetext").text("发言讨论结束，大家请投票");
    $(".twotext").text("点击下方玩家头像，再点击操作图标");
    
}
// 判断平民死活状态
$(".start").click(function () {
    if (alive === 4) {
        for (let i = 0; i < id.length; i++) {
            if ($(".wrap")[i].style.outlineColor == "rgb(255,0,0)") {
                playerState[i].state = "dead";
                playerState[i].way = "killed";
                // playerState[i].day = date;
                killResult = playerState[i].num + "号被杀死，他的身份是" + playerState[i].identity;

            }


        }
        var i = sessionStorage.getItem("index")
        console.log(i)
        console.log('this:');

        console.log(playerState);


        if (playerState[i].num == i + 1) {
            playerState[i].state = "dead"
            playerState[i].way = "killed"

        }


        // var killNum = playerState.filter(function (box,index,playerState) {
        //     for (let f = 0; f< playerState.length; f++) {
        //         if (box.state ==="live" && box.identity === "杀手") {
        //             killNum ++;



        //         }



        //     }


        // });


        var allNum = playerState.filter(function (box, index, playerState) {
            if (box.way === "killed" && gameother == "1") {
                box.how = "sha"
                box.state = "dead"
                box.how = "sha"
                box.day = day                
                return box;
            } else if (box.way === "killed" && gameother == "4") {
                box.how = "tou"
                box.state = "dead"
                box.how = "tou"
                box.day = day-1
                return box;
            }

        });
        //推出死人数组

        var deadArray =JSON.parse(sessionStorage.getItem("deadArray"));
        
        console.log(allNum);
        var n = allNum[0];
        console.log("nnnnnn")
        console.log(n)
        if (day=="1") {
        var deadArray = [];
            
        }else{
            // var deadArray = deadArray.split(",")

        }
        console.log(deadArray);
        deadArray.push(n);
        console.log(deadArray);
        sessionStorage.setItem("deadArray",JSON.stringify(deadArray));


        //平民活着人数
        for (let p = 0; p < playerState.length; p++) {
            if (playerState[p].state === "live" && playerState[p].identity === "平民") {
                civNum++;



            }

        }
        //杀手活着人数
        for (let p = 0; p < playerState.length; p++) {
            if (playerState[p].state === "live" && playerState[p].identity === "杀手") {
                killLive++;



            }

        }

        console.log("civNum");
        console.log(civNum);

       
        
        if (civNum == killLive) {
            alert("杀手胜利");
            location.href = "js2-7.html";
            sessionStorage.setItem("victory","杀手胜利")
            


        }else if (killLive == 0) {
            alert("平民胜利");
            sessionStorage.setItem("victory","平民胜利")
            location.href = "js2-7.html";
            
            
        } else {
            //储存死亡对象数组
            sessionStorage.setItem("playerState", JSON.stringify(playerState));
            var se = sessionStorage.getItem("playerState")
            console.log(se)

            playerState = JSON.parse(se)
            console.log(playerState)
            sessionStorage.setItem("allNum", JSON.stringify(allNum));
            console.log(allNum);






            // var jsonObj1 = JSON.parse(playerState);
            // console.log(playerState)
            sessionStorage.setItem("gameother", gameother);



            location.href = "js2-5.html";






        }


    } else {
        alert("请点击杀人");
    }


})
var killse = sessionStorage.getItem("allNum");
var kills = JSON.parse(killse);




for (let p = 0; p < playerState.length; p++) {
    if (playerState[p].state == "dead") {
        $(".wrap").eq(p).css("opacity", "0.4");

    }

}
$(".right").click(function () {
    location.href = "js2-1.html"
    
})