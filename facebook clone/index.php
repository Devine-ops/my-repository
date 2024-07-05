<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <title>Facebook clone</title>
        <meta charset="utf-8">
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,100&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">

    </head>

    <body>  
        <header>
            <div class="center">
                <div class="logo">
                    <h2>Facebook</h2>
                </div><!--logo-->

                <form method="post" class="form-login">
                    <div class="form-element">
                        <p>E-mail ou telefone:</p>
                        <input type="email" />
                    </div><!--form-element-->

                    <div class="form-element">
                        <p>Senha:</p>
                        <input type="password" />
                        <a href="#">Esqueceu a conta?</a>
                    </div><!--form-element-->
                    

                    <div class="form-element">
                        <input type="submit" name="acao" ></input>
                    </div><!--form-element-->
                </form><!--form-login-->    
                <div class="clear"></div>
            </div><!--center-->
        </header>

        <section class="main">
            <div class="center">
                <div class="img-pessoas">
                    <div class="box-h3">
                        <h3>O Facebook ajuda você a se conectar e compartilhar com pessoas que fazem parte da sua vida.</h3>
                    </div><!--box-h3-->
                    <img src="kisspng-business-networking-computer-network-social-media-planned-5b34d7288647e6.87096059153018960855.png">
                </div><!--pessoas-->
                
                <div class="abrir-conta">
                    <h2>Abra sua conta</h2>
                    <h4>É gratuito e sempre será.</h4>

                    <form class="create-account">
                        <div class="w50">
                            <input placeholder="Nome" type="text">
                        </div><!--w50-->

                        <div class="w50">
                            <input placeholder="Sobrenome" type="text">
                        </div><!--w50-->

                        <div class="w100">
                            <input placeholder="E-mail ou Telefone" type="email">
                        </div><!--w100-->

                        <div class="w100">
                            <input placeholder="Senha" type="password">
                        </div><!--w100-->

                        <div class="w100">
                            <h2>Data de Nascimento:</h2>
                            <select name="nascimneto-dia" class="nascimento">
                                <?php
                                    for($i = 1; <= 31; $i++){
                                ?>
                                <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                                <?php } ?>
                            </select>
                        
                            <select name="nascimneto-mes" class="nascimento">
                                
                                <option value="nascimneto-mes"></option>
                                
                            </select>
                       
                            <select name="nascimneto-ano" class="nascimento">
                                <option value="0">2000</option>
                            </select>
                            <div class="clear"></div>
                        </div><!--w100-->
                        
                        <div class="w100">
                            <input type="submit" name="acao" value="Cadastre-se!">
                        </div><!--w100-->

                    </form><!--create-account-->

                </div><!--abrir-conta-->

                <div class="clear"></div>
            </div><!--center-->
        </section><!--main-->



    </body>

</html>