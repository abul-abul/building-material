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
     * @Route("/add-basket", name="user_reg")
     */
    public function addBasketAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
//        $coocAll = $request->cookies->get('productId');


        $result = $request->request->all();
        $id = $result['id'];
        $product =$em->getRepository("AppBundle:Product")->find($id);
     //   $session->set('product', $product);



//
       // $cookie = new Cookie('productId', $product->getId());
        $cookie = new Cookie('productId', $product->getId(), strtotime('now + 60 minutes'));



        $response = new Response();
        $response->headers->setCookie($cookie);
        $response->headers->getCookies();
        $response->send();


        return new Response($response);


  //  die;


      //  $rebateProducts = $productRepo->rebateProduct();
        return [


        ];

    }


}
