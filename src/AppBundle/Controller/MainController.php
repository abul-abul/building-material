<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Category;
use AppBundle\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\Sonata\MediaBundle\Entity\Gallery;
use Application\Sonata\MediaBundle\Entity\GalleryHasMedia;
use Application\Sonata\MediaBundle\Entity\Media;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class MainController extends BaseController
{
    /**
     * @param $binaryContent
     * @param $filename
     * @return UploadedFile
     */
    private function createTempFile($binaryContent,$filename) {

        $temporaryFileName = tempnam(sys_get_temp_dir(), $filename);
        file_put_contents($temporaryFileName, $binaryContent);
        return new UploadedFile(
            $temporaryFileName,
            $filename
        );
    }

    public function createSonataMedia($item){

        //create media
        $mediaManager = $this->get("sonata.media.manager.media");
        $media = new Media();
        $file = $item;
        $filename = 'image.jpg';
//        list($type, $file) = explode(';', $file);
//        list(, $file)      = explode(',', $file);
        $file = base64_decode($file);

        $file = $this->createTempFile($file,$filename);
        $media->setBinaryContent($file);
        $media->setContext('default'); //contex you are using
        $media->setProviderName('sonata.media.provider.image');

        $mediaManager->save($media);



        return $media;
    }

    /**
     * @param $fileArr
     * @return Gallery
     */
    public function createGallery($file){

        $em = $this->getDoctrine()->getManager();
        $name = 'gallery';
        $gallery = $this->createSonataGallery($name);
        $i = 1;
        $fileArr= array('data'=>$file);
        foreach ($fileArr as $item){
            //create media
            $media = $this->createSonataMedia($item);
            //create gallery has media
            $galleryHasMedia = $this->createSonataGalleryHasMedia($media, $i);
            $gallery->addGalleryHasMedia($galleryHasMedia);
            $i++;
        }
        $em->persist($gallery);
        $em->flush();

        return $gallery;
    }


    /**
     * @param $name
     * @return Gallery
     */
    public function createSonataGallery($name){

        $gallery = new Gallery();
        $gallery->setName($name);
        $gallery->setContext('default');
        $gallery->setEnabled(true);
        return $gallery;
    }

    /**
     * @param $media
     * @param $position
     * @return GalleryHasMedia
     */
    public function createSonataGalleryHasMedia($media, $position){

        $galleryHasMedia = new GalleryHasMedia();
        $galleryHasMedia->setMedia($media);
        $galleryHasMedia->setPosition($position);

        return $galleryHasMedia;
    }



    /**
     * @Route("/test/{id}", name="test")
     * @Template()
     */
    function saveImageAction($id)
    {

        //https://anyconv.com/html-to-xml-converter/
        //https://www.freefileconvert.com/file/8KLo3QEO2L26
        //https://www.freeformatter.com/xml-to-json-converter.html#ad-output
        //https://www.isolux.ru/krepezh-1/skobyanyye-izdeliya/ruchki-dvernyye.html?p=14
        $em = $this->getDoctrine()->getManager();

        $appPath = $this->container->getParameter('kernel.root_dir');
        $webPath = realpath($appPath . '/../web/uploads/test.json');

        $arrays = json_decode(file_get_contents($webPath), true);

        $fins = [];

        $previousValue = null;
        foreach ($arrays['para'] as $key=>$array){

            $fins[] = $array;

        }
        $arrays = array_chunk($fins,7);


        foreach ($arrays as $key=>$array){
            $imagesLink = $array[0]['inlinegraphic']['@fileref'];
            if(strstr( $imagesLink, 'jpg' ) or strstr( $imagesLink, 'png' ) or strstr( $imagesLink, 'jpeg' )){
                if(isset($array[1]['ulink']['#text'])){
                    $title = $array[1]['ulink']['#text'];
                }else{
                    $title = 'title';
                }

                $priceString = $array[4];
                preg_match_all('!\d+!', $priceString, $matches);

                if(count($matches[0]) != 0){
                    $price = $matches[0][0].','.$matches[0][1];
                }else{
                    $price = 0;
                }

                $arrays[$key][0] = $imagesLink;
                $arrays[$key][1] = $title;
                $arrays[$key][4] = $price;

            }else{
                unset($arrays[$key]);
            }



        }


        $category =$em->getRepository("AppBundle:Category")->find($id);
        foreach ($arrays as $array){
            $product = new Product();
            $imagesLink = $array[0];
            $title = $array[1];
            $price = $array[4].' руб.';
            $productRepo =$em->getRepository("AppBundle:Product")->findOneBy(array('name'=>$title,'price'=>$price));
           // dump($productRepo);die;
            if(!$productRepo){
                $img = file_get_contents($imagesLink);
                $data = base64_encode($img);
                $media = $this->createSonataMedia($data);
                $gallery = $this->createGallery($data);
                $product->setName($title);
                $product->setPrice($price);
                $product->setImage($media);
                $product->setGallery($gallery);
                $product->setCategory($category);
                $em->persist($product);

            }

        }

        $em->flush();



        return $this->redirectToRoute('home');
    }

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
