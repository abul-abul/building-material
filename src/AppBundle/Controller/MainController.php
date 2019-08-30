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
        $category =$em->getRepository("AppBundle:Category")->findBy(array('status'=>1));



        $productRepo =$em->getRepository("AppBundle:Product");

        $query = 'SELECT id FROM  product
                ORDER BY RAND()
                LIMIT 10';



        $statement = $em->getConnection()->prepare($query);

        $statement->execute();

        $rendProduct = $statement->fetchAll();
        $products = [];
        foreach ($rendProduct as $rendid){
            $product =$em->getRepository("AppBundle:Product")->find($rendid['id']);
            array_push($products,$product);
        }

        return [

            'categorys'=>$category,

            'rendProducts'=>$products,
            'homeSilders'=>$homeSilder
        ];

    }

    /**
     * @Route("/search", name="search")
     * @Template()
     */
    public function searchAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $term = $request->request->get('term');

        if($term == null){
            return $this->redirectToRoute('home');
        }
        $categoryRepo =$em->getRepository("AppBundle:Category");
        $productRepo =$em->getRepository("AppBundle:Product");
        $catSearch = $categoryRepo->search($term);

        $praductSearch = $productRepo->search($term);

        return [
            'products'=>$praductSearch,
            'catSearch'=>$catSearch
        ];

    }





}
