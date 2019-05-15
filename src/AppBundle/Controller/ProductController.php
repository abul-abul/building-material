<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class ProductController extends BaseController
{
    /**
     * @Route("/product/{id}", name="homepage")
     * @Template()
     */
    public function productAction($id,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $homeSilder =$em->getRepository("AppBundle:HomeSlider")->findAll();


      //  $rebateProducts = $productRepo->rebateProduct();
        return [


        ];

    }


}
