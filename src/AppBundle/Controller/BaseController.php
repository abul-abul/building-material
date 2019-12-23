<?php


namespace AppBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class BaseController extends Controller
{
// stroyluxe_prod
// 8M3u0K4r


    public function infoRandAction()
    {
        $em = $this->getDoctrine()->getManager();
        $info =$em->getRepository("AppBundle:InfoSite")->findOneBy([]);
        return $this->render('AppBundle:base:info.html.twig',
            array(
                'info'=>$info
            )
        );
    }

    public function aboutRandAction()
    {
        $em = $this->getDoctrine()->getManager();
        $about =$em->getRepository("AppBundle:AboutSite")->findOneBy([]);
        return $this->render('AppBundle:base:about.html.twig',
            array(
                'about'=>$about
            )
        );

    }


    public function categoryRandAction()
    {
        $em = $this->getDoctrine()->getManager();
        $categorys =$em->getRepository("AppBundle:Category")->findBy(array('status'=>1));
        return $this->render('AppBundle:base:category.html.twig',
            array(
                'categorys'=>$categorys
            )
        );

    }


    public function basketProductAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $cookies = $request->cookies;
        $productCook = $cookies->get('productId');
        $arrIds = explode(',',$productCook);
        $objProducts = [];
        foreach ($arrIds as $arrId){
           $product =$em->getRepository("AppBundle:Product")->find($arrId);
           array_push($objProducts,$product);
        }


        return $this->render('AppBundle:base:basketProduct.html.twig',
            array(
                'countProductBasket'=>count($objProducts),
                'products'=>$objProducts
            )
        );
    }

    public function basketProductCountAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $cookies = $request->cookies;
        $productCook = $cookies->get('productId');
        $arrIds = explode(',',$productCook);
        $objProducts = [];
        $priceTotal = 0;
        foreach ($arrIds as $arrId){
            $product =$em->getRepository("AppBundle:Product")->find($arrId);
//            $priceTotal += (int)$product->getPrice();
            array_push($objProducts,$product);
        }
//dump($priceTotal);
//die;
        if(count($objProducts) == 0 || $objProducts[0] == null){
            $objProductsCount = 0;

        }else{
            $objProductsCount = count($objProducts);

        }

        return $this->render('AppBundle:base:basketProductCount.html.twig',
            array(
                'objProducts'=>$objProducts,
                'priceTotal' =>$priceTotal,
                'countProductBasket'=>$objProductsCount

            )
        );
    }


    public function buildCategoryAction()
    {
        $em = $this->getDoctrine()->getManager();
        $categorys =$em->getRepository("AppBundle:Category")->findBy(['status'=>1]);

        $cateArray = [];
        foreach ($categorys as $category){
            if($category->getParentCategory()){
                $parent_id = $category->getParentCategory()->getId();
            }else{
                $parent_id = $category->getParentCategory();
            }

            $cateArray[] = array('id'=>$category->getId(),'name'=>$category->getName(),'parent_id'=>$parent_id);

        }


        $result =  $this->build_menu($cateArray);
        //dump($result);die;
        return $this->render('AppBundle:base:buildCategory.html.twig',
            array(
                'results' => $result,
                'cateArrays' => $cateArray

            )
        );

    }

    function build_menu($rows,$parent=0)
    {
        $result = [];

        foreach ($rows as $row)
        {
            $parent_id = $row['parent_id'];
            if ($parent_id == $parent){
                $result[$row['id']] = $row['name'];
                if ($this->has_children($rows,$row['id'])){
                    $result[$row['id']] = $this->build_menu($rows,$row['id']);
                }
            }
        }

        return $result;

    }

    function has_children($rows,$id)
    {
        foreach ($rows as $row) {
            if ($row['parent_id'] == $id)
                return true;
        }
        return false;
    }


}