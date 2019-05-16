<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class ProductController extends BaseController
{
    /**
     * @Route("/product-list/{id}", name="product_list")
     * @Template()
     */
    public function productListAction($id,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $productRepo =$em->getRepository("AppBundle:Product");
        $category =$em->getRepository("AppBundle:Category")->find($id);
        $categorys =$em->getRepository("AppBundle:Category")->findAll();
       // dump($categorys);die;
        $product = $productRepo->findBy(array('category' => $id));

        $query = 'SELECT id FROM  product
                ORDER BY RAND()
                LIMIT 4';



        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $rendProduct = $statement->fetchAll();
        $productsRend = [];
        foreach ($rendProduct as $rendid){
            $productRand =$em->getRepository("AppBundle:Product")->find($rendid['id']);
            array_push($productsRend,$productRand);
        }

        return [
            'category'=>$category,
            'categorys'=>$categorys,
            'products' => $product,
            'productsRend' => $productsRend
        ];

    }

    /**
     * @Route("/product-inner/{id}", name="product_inner")
     * @Template()
     */
    public function productInnerAction($id,Request $request)
    {
        dump($id);die;
    }


}
