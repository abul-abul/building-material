<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;


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


        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $product, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            10 /*limit per page*/
        );
        return [
            'category'=>$category,
            'categorys'=>$categorys,
            'products' => $pagination,
            'productsRend' => $productsRend
        ];

    }

    /**
     * @Route("/product-inner/{id}", name="product_inner")
     * @Template()
     */
    public function productInnerAction($id,Request $request)
    {
//        $response = new Response();
//        $response->headers->clearCookie('myCookie');
//        $response->send();
//dump($request->cookies);die;
        $em = $this->getDoctrine()->getManager();
        $product =$em->getRepository("AppBundle:Product")->find($id);
        $categorys =$em->getRepository("AppBundle:Category")->findAll();
        $query = 'SELECT id FROM  product
                ORDER BY RAND()
                LIMIT 4';

        $productCat = $em->getRepository("AppBundle:Product")->findBy(array('category' => $id));


        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $rendProduct = $statement->fetchAll();
        $productsRend = [];
        foreach ($rendProduct as $rendid){
            $productRand =$em->getRepository("AppBundle:Product")->find($rendid['id']);
            array_push($productsRend,$productRand);
        }

       return [
           'product'=>$product,
           'productCats'=>$productCat,
           'productsRend' => $productsRend,
           'categorys'=>$categorys
       ];
    }


    /**
     * @Route("/one-product", name="one_product")
     */
    public function oneProductAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $result = $request->request->all();
        $id = $result['id'];
        $product =$em->getRepository("AppBundle:Product")->find($id);

        $productArray = [];

        $productArray['name'] = $product->getName();
        $productArray['description'] = $product->getDescription();
        $productArray['price'] = $product->getPrice();
        $productArray['rebate'] = $product->getRebate();

        foreach ($product->getGallery()->getGalleryHasMedias() as $file){
           $pathImg = $this->container->get('sonata.media.twig.extension')->path($file, 'reference');
            $productArray['image'][] = $pathImg;
        }

        return new JsonResponse($productArray);

    }


}
