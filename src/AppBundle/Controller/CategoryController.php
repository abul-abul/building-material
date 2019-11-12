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
        $category =$em->getRepository("AppBundle:Category")->findBy(['parent_category'=>null,'status'=>1]);


      //  $rebateProducts = $productRepo->rebateProduct();
        return [
            'categorys' => $category
        ];

    }

    /**
     * @Route("/category-inner/{id}", name="oneCategory")
     * @Template()
     */
    public function oneCategoryAction($id,Request $request)
    {

        $em = $this->getDoctrine()->getManager();
        $category = $em->getRepository("AppBundle:Category")->findBy(['parent_category'=>$id,'status'=>1]);


      //  $rebateProducts = $productRepo->rebateProduct();
        return [
            'categorys' => $category
        ];

    }


}
