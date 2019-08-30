<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;


class AboutController extends BaseController
{
    /**
     * @Route("/about", name="about")
     * @Template()
     */
    public function aboutAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $about = $em->getRepository("AppBundle:AboutSite")->findOneBy([]);
        $category = $em->getRepository("AppBundle:Category")->findBy(array('status'=>1));

        return [
            'about'=> $about,
            'categorys'=> $category
        ];

    }

}
