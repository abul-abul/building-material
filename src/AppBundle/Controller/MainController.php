<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class MainController extends BaseController
{
    /**
     * @Route("/", name="home")
     * @Template()
     */
    public function homeAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $homeSilder =$em->getRepository("AppBundle:HomeSlider")->findAll();
        $category =$em->getRepository("AppBundle:Category")->findAll();



        $productRepo =$em->getRepository("AppBundle:Product");

        $query = 'SELECT id FROM  product
                ORDER BY RAND()
                LIMIT 5';



        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $rendProduct = $statement->fetchAll();
        $products = [];
        foreach ($rendProduct as $rendid){
            $product =$em->getRepository("AppBundle:Product")->find($rendid['id']);
            array_push($products,$product);
        }







      //  $rebateProducts = $productRepo->rebateProduct();
        return [

            'categorys'=>$category,

            'rendProducts'=>$products,
            'homeSilders'=>$homeSilder
        ];

    }


}
