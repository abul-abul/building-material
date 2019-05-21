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
                $this->get('session')->getFlashBag()->add('error', 'напишите имя ');
                return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));
            }

            if($result['lastname']){
                $buyObj->setLastname($result['lastname']);
            }else{
                $this->get('session')->getFlashBag()->add('error', 'напишите фамилия  ');
                return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));
            }

            if($result['email']){
                if(filter_var($result['email'], FILTER_VALIDATE_EMAIL)) {
                    $buyObj->setEmail($result['email']);
                }else{
                    $this->get('session')->getFlashBag()->add('error', 'написать правильное  электроны почта');
                    return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));

                }


            }else{
                $this->get('session')->getFlashBag()->add('error', 'напишите электроны почта');
                return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));
            }

            if($result['address']){
                $buyObj->setAddress($result['address']);
            }else{
                $this->get('session')->getFlashBag()->add('error', 'напишите аддрес ');
                return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));
            }


            if($result['phone']){
                $buyObj->setPhone($result['phone']);
            }else{
                $this->get('session')->getFlashBag()->add('error', 'напишите телефон  ');
                return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));
            }
            if($result['product_count'] > 0){
                $buyObj->setProductCount($result['product_count']);
            }else{
                $this->get('session')->getFlashBag()->add('error', '');
                return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));
            }

            $product =$em->getRepository("AppBundle:Product")->find($result['product_id']);
            $buyObj->setProduct($product);

            $em->persist($buyObj);
            $em->flush();

            $this->get('session')->getFlashBag()->add('success', 'Спасибо за ваш заказ мы свяжемся с вами ');
            return $this->redirectToRoute('product_inner', array('id' => $result['product_id']));


        }











//       return [
//           'product'=>$product,
//
//
//
//       ];
    }


}
