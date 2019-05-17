<?php


namespace AppBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class BaseController extends Controller
{

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
        $categorys =$em->getRepository("AppBundle:Category")->findAll();
        return $this->render('AppBundle:base:category.html.twig',
            array(
                'categorys'=>$categorys
            )
        );

    }

}