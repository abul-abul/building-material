<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class CategoryController extends BaseController
{
    /**
     * @Route("/category-list", name="category_list")
     * @Template()
     */
    public function categoryListAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $homeSilder =$em->getRepository("AppBundle:HomeSlider")->findAll();


      //  $rebateProducts = $productRepo->rebateProduct();
        return [


        ];

    }


}
