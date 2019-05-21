<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Entity\CallRequest;


class CallRequestController extends BaseController
{
    /**
     * @Route("/call-request", name="call_request")
     */
    public function callRequestAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $callRequestobj = new CallRequest;

        $call_name = $request->request->get('call_name');
        $call_phone = $request->request->get('call_phone');

        if($call_name == ''){
            $response = new Response(json_encode(array('status' => '500')));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }else{
            $callRequestobj->setName($call_name);
        }

        if($call_phone == ''){
            $response = new Response(json_encode(array('status' => '500')));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }else{
            $callRequestobj->setPhone($call_phone);
        }

        $em->persist($callRequestobj);
        $em->flush();

        $response = new Response(json_encode(array('status' => '200')));
        $response->headers->set('Content-Type', 'application/json');

        return $response;








     //   return new Response($response);


    }



}
