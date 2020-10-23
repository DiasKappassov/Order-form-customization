<?php


/* Your e-mail for inbox messages */
// $myemail = "order@bp2.se";
$email1 = "smart_mine@hotmail.com";


$name = check_input($_POST['crowdfund-name'], "Enter your name");
$subject = check_input($_POST['crowdfund-subject'], "Enter a subject");
$email = check_input($_POST['crowdfund-email']);
$message = check_input($_POST['crowdfund-message'], "Write your message");
$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";

if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
{
show_error("E-mail address not valid");
}

$msg = 'Name: '.$name."<br>";
$msg .= 'E-mail: '.$email."<br>";
$msg .= $message;


// mail($myemail, $subject, $msg, $headers);
mail($email1, $subject, $msg, $headers);


function check_input($data, $problem='')
{
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
if ($problem && strlen($data) == 0)
{
show_error($problem);
}
return $data;
}

function show_error($myError)
{
?>
<html>
<body>

<p>Please correct the following error:</p>
<strong><?php echo $myError; ?></strong>
<p>Hit the back button and try again</p>

</body>
</html>
<?php
exit();
}
?>
