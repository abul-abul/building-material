<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;

use AppBundle\Entity\Buy;

class OrderController extends BaseController
{


    /**
     * @Rest\Post("/product-order", name="order_product")
     * @Template()
     */
    public function productInnerAction(Request $request)
    {

        $em = $this->getDoctrine()->getManager();

        if($request->isMethod('post')){
            $result = $request->request->all();
            $buyObj = new Buy;

            if($result['firstname']){
                $buyObj->setFirstname($result['firstname']);
            }else{

            }

            if($result['lastname']){
                $buyObj->setLastname($result['lastname']);
            }else{

            }

            if($result['email']){
                $buyObj->setEmail($result['lastname']);
            }else{

            }

            if($result['address']){
                $buyObj->setAddress($result['lastname']);
            }else{

            }


            if($result['phone']){
                $buyObj->setPhone($result['lastname']);
            }else{

            }
            $product =$em->getRepository("AppBundle:Product")->find($result['product_id']);
            $buyObj->setProduct($product);
dump($buyObj);
            $em->persist($buyObj);
            $em->flush();

            die;


        }











//       return [
//           'product'=>$product,
//
//
//
//       ];
    }


}
