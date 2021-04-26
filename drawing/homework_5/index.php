<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Mover</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main>
        <h1 id="title"></h1>
        <div id="graph">
            <div id="circle"></div>
        </div>
        <p id="description"></p>
    </main>
</body>
    <script> 
    //I cant believe I wrote this thinking that it would hide my key... oh well
        //since the assignment asks us to use primarily js I didnt rewrite this in god awful php
    const api_key = <?php include('scripts/apikey.php'); echo json_encode($key); ?> 
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js" integrity="sha512-hZf9Qhp3rlDJBvAKvmiG+goaaKRZA6LKUO35oK6EsM0/kjPK32Yw7URqrq3Q+Nvbbt8Usss+IekL7CRn83dYmw==" crossorigin="anonymous"></script>
    <script src="scripts/script.js"></script>
</html>