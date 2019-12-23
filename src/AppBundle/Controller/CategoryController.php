<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class CategoryController extends BaseController
{

    /**
     * @Route("/category-inner/{id}", name="oneCategory")
     * @Template()
     */
    public function oneCategoryAction($id,Request $request)
    {

        $em = $this->getDoctrine()->getManager();
        $category = $em->getRepository("AppBundle:Category")->findBy(['parent_category'=>$id,'status'=>1]);
        if(count($category) != 0){
            return [
                'categorys' => $category
            ];
        }else{
            $productObj = New ProductController();
           return $this->redirectToRoute('product_list', array('id' => $id));
        }


        //  $rebateProducts = $productRepo->rebateProduct();
        return [
            'categorys' => $category
        ];

    }

    /**
     * @Route("/category-list", name="category_list")
     * @Template()
     */
    public function categoryListAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        //$category =$em->getRepository("AppBundle:Category")->findBy(['parent_category'=>null,'status'=>1]);
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


//dump($result);
//die;

      //  $rebateProducts = $productRepo->rebateProduct();
        return [
            'categorys' => $category,
            'results' => $result,
            'cateArrays' => $cateArray
        ];

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
