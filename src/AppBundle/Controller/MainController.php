<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class MainController extends BaseController
{
    /**
     * @Route("/", name="homepage")
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

        $query1 = 'SELECT id,rebate FROM  product
                WHERE rebate IS NOT NULL
                ORDER BY RAND()  	
                LIMIT 4';


        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $rendProduct = $statement->fetchAll();
        $products = [];
        foreach ($rendProduct as $rendid){
            $product =$em->getRepository("AppBundle:Product")->find($rendid['id']);
            array_push($products,$product);
        }




        $statement1 = $em->getConnection()->prepare($query1);

        $statement1->execute();

        $rendProductRebate = $statement1->fetchAll();
        $productsRebate = [];
        foreach ($rendProductRebate as $id){
            $product =$em->getRepository("AppBundle:Product")->find($id['id']);
            array_push($productsRebate,$product);
        }


      //  $rebateProducts = $productRepo->rebateProduct();
        return [

            'categorys'=>$category,
            'rebateProducts'=>$productsRebate,
            'rendProducts'=>$products,
            'homeSilders'=>$homeSilder
        ];

    }


}
