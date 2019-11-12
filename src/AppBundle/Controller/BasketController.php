<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;


class BasketController extends BaseController
{

    /**
     * @Route("/basket", name="basket")
     * @Template()
     */
    public function basketAction()
    {

        return [];
    }

    /**
     * @Route("/add-basket", name="add_basket")
     */
    public function addBasketAction(Request $request)
    {
        $arrCook = [];

        $cookies = $request->cookies;
        if ($cookies->has('productId'))
        {
            array_push($arrCook,$cookies->get('productId'));

        }

        $result = $request->request->all();
        $id = $result['id'];

//        dump( array_search($id, explode(',',$cookies->get('productId'))));
//
//die;
        if ((array_search($id, explode(',',$cookies->get('productId')))) == false) {
            array_push($arrCook,$id);


            $arrString = implode(",",$arrCook);

            $cookie = new Cookie('productId',$arrString, time()+31556926);



            $response = new Response();
            $response->headers->setCookie($cookie);
            $response->headers->getCookies();
            $response->send();


        }else{
            $response = ' ';

        }







        return new Response($response);


    }

    /**
     * @Route("/delete-basket", name="user_reg")
     */
    public function deleteBasketAction(Request $request)
    {
        $result = $request->request->all();
        $id = $result['id'];
        $arrCook = [];
        $cookies = $request->cookies;
        if ($cookies->has('productId'))
        {
            array_push($arrCook,$cookies->get('productId'));

        }
        $arrString = implode(",",$arrCook);
        $exp = explode(',',$arrString);
        if (($key = array_search($id, $exp)) !== false) {
            unset($exp[$key]);
        }
        $arrString = implode(",",$exp);
        $cookie = new Cookie('productId',$arrString, strtotime('now + 60 minutes'));
        $response = new Response();
        $response->headers->setCookie($cookie);
        $response->headers->getCookies();
        $response->send();


        return new Response($response);
    }

}
