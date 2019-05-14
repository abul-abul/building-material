<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table(name="product")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\ProductRepository")
 */
class Product
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var
     * @ORM\Column(name="name", type="string", nullable=false)
     */
    protected $name;

    /**
     * @var
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    protected $description;

    /**
     * @var
     * @ORM\Column(name="price", type="string", nullable=false)
     */
    protected $price;

    /**
     * @var
     * @ORM\Column(name="count_price", type="string", nullable=true)
     */
    protected $countPrice;

    /**
     * @var
     * @ORM\Column(name="rebate", type="string", nullable=true)
     */
    protected $rebate;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Application\Sonata\MediaBundle\Entity\Media", cascade={"persist"})
     */
    protected $image;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Application\Sonata\MediaBundle\Entity\Gallery", cascade={"persist"})
     */
    protected $gallery;
    
    /**
     *
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="Product")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id" )
     */
    protected $category;

    /**
     * @ORM\OneToMany(targetEntity="Buy", mappedBy="product",  cascade={"persist", "remove"})
     */
    protected $buy;

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->getName();
    }



    /**
     * Constructor
     */
    public function __construct()
    {
        $this->buy = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Product
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set price.
     *
     * @param string $price
     *
     * @return Product
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price.
     *
     * @return string
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set countPrice.
     *
     * @param string|null $countPrice
     *
     * @return Product
     */
    public function setCountPrice($countPrice = null)
    {
        $this->countPrice = $countPrice;

        return $this;
    }

    /**
     * Get countPrice.
     *
     * @return string|null
     */
    public function getCountPrice()
    {
        return $this->countPrice;
    }

    /**
     * Set rebate.
     *
     * @param string|null $rebate
     *
     * @return Product
     */
    public function setRebate($rebate = null)
    {
        $this->rebate = $rebate;

        return $this;
    }

    /**
     * Get rebate.
     *
     * @return string|null
     */
    public function getRebate()
    {
        return $this->rebate;
    }

    /**
     * Set image.
     *
     * @param \Application\Sonata\MediaBundle\Entity\Media|null $image
     *
     * @return Product
     */
    public function setImage(\Application\Sonata\MediaBundle\Entity\Media $image = null)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return \Application\Sonata\MediaBundle\Entity\Media|null
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set category.
     *
     * @param \AppBundle\Entity\Category|null $category
     *
     * @return Product
     */
    public function setCategory(\AppBundle\Entity\Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category.
     *
     * @return \AppBundle\Entity\Category|null
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Add buy.
     *
     * @param \AppBundle\Entity\Buy $buy
     *
     * @return Product
     */
    public function addBuy(\AppBundle\Entity\Buy $buy)
    {
        $this->buy[] = $buy;

        return $this;
    }

    /**
     * Remove buy.
     *
     * @param \AppBundle\Entity\Buy $buy
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeBuy(\AppBundle\Entity\Buy $buy)
    {
        return $this->buy->removeElement($buy);
    }

    /**
     * Get buy.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBuy()
    {
        return $this->buy;
    }

    /**
     * Set gallery.
     *
     * @param \Application\Sonata\MediaBundle\Entity\Gallery|null $gallery
     *
     * @return Product
     */
    public function setGallery(\Application\Sonata\MediaBundle\Entity\Gallery $gallery = null)
    {
        $this->gallery = $gallery;

        return $this;
    }

    /**
     * Get gallery.
     *
     * @return \Application\Sonata\MediaBundle\Entity\Gallery|null
     */
    public function getGallery()
    {
        return $this->gallery;
    }
}
