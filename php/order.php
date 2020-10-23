<?php
/* Your e-mail for inbox messages */
$myemail = "order@bp2.se";
// $email1 = "smart_mine@hotmail.com";

$rewards = check_input($_POST['reward'], "Select your rewards");
$name = check_input($_POST['crowdfund-first-name'], "Enter your name");
$lastname = check_input($_POST['crowdfund-last-name'], "Enter your last name");
$address = check_input($_POST['crowdfund-address'], "Enter your address");
$address2 = check_input($_POST['crowdfund-address-line-2'], "Enter your address line 2");
$postcode = check_input($_POST['crowdfund-postcode'], "Enter your postcode");
$town = check_input($_POST['crowdfund-town'], "Enter your town");
$country = check_input($_POST['crowdfund-country'], "Select your country");
$email = check_input($_POST['crowdfund-mail']);
$phone = check_input($_POST['crowdfund-phone-daytime'], "Enter your phone (daytime)");
$phone2 = check_input($_POST['crowdfund-phone-home'], "Enter your phone (home)");

$subject = "Order rewards";
$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";

if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
{
show_error("E-mail address not valid");
}

$msg = 'Rewards: ' .$rewards."<br>";
$msg .= 'First Name: '.$name."<br>";
$msg .= 'Last Name: '.$lastname."<br>";
$msg .= 'Address: '.$address."<br>";
$msg .= 'Address line 2: '.$address2."<br>";
$msg .= 'Postcode: '.$postcode."<br>";
$msg .= 'Town: '.$town."<br>";
$msg .= 'Country: '.$country."<br>";
$msg .= 'E-mail: '.$email."<br>";
$msg .= 'Phone (daytime) '.$phone."<br>";
$msg .= 'Phone (home): '.$phone2."<br>";

mail($myemail, $subject, $msg, $headers);
// mail($email1, $subject, $msg, $headers);



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
